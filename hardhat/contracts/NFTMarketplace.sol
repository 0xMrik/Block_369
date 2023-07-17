// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage {

    // State Variables
    address payable owner; 
    uint256 listPrice = 0.0001 ether; 

    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds; 
    Counters.Counter private _itemsSold;

    // Structs
    struct LeaseContract {
        address tenant;
        uint256 rent;
        uint256 leaseDuration;
        uint256 startTime;
        uint256 endTime;
        uint256 nextPaymentDue; 
        uint256 paymentNoticeSent;
    }

    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller; 
        uint256 price;
        bool currentlyListed;
        LeaseContract leaseContract;
    }

    // Events
    event RentPaid(address indexed tenant, uint256 tokenId, uint256 amount);
    event LeaseTerminated(address indexed tenant, uint256 tokenId);
    event PaymentNoticeSent(address indexed tenant, uint256 tokenId);

    // Mappings
    mapping(uint256 => ListedToken) private idToListedToken;

    // Constructor
    constructor() ERC721("NFTMarketplace", "NFTM") {
        owner = payable(msg.sender); 
    }

     ///////////////////////////// MARKETPLACE ///////////////////////////////////////

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update the listing price");
        listPrice = _listPrice; 
    }

    function getListPrice() public view returns (uint256) {
        return listPrice; 
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current(); 
        return idToListedToken[currentTokenId];
    }

    function getListedForTokenId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    ///////////////////////////// MINT ///////////////////////////////////////

    function createToken(string memory tokenURI, uint256 price, uint256 rent, uint256 leaseDuration) public payable returns (uint) {
        require(msg.value == listPrice, "Send enough ether to list");
        require(price > 0, "Make sure the price isn't negative");

        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();
        _safeMint(msg.sender, currentTokenId);

        _setTokenURI(currentTokenId, tokenURI);

        LeaseContract memory leaseContract = LeaseContract({
            tenant: address(0),
            rent: rent,
            leaseDuration: leaseDuration,
            startTime: block.timestamp,
            endTime: block.timestamp + leaseDuration,
            nextPaymentDue: block.timestamp + leaseDuration, 
            paymentNoticeSent: 0 
        });

        createListedToken(currentTokenId, price, leaseContract);
        return currentTokenId;
    }
   

    function createListedToken(uint256 tokenId, uint256 price, LeaseContract memory leaseContract) private {
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true,
            leaseContract
        );

        _transfer(msg.sender,address(this), tokenId);
    }

    function getAllNFTs() public view returns(ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount); 

        uint currentIndex = 0;

        for(uint i=0;i<nftCount;i++) {
            uint currentId = i+1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex]= currentItem;
            currentIndex += 1;
        }

        return tokens;
    }

    function getMyNFTs() public view returns(ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        ListedToken storage token = idToListedToken[tokenId];
        require(token.currentlyListed, "This NFT is not listed for sale");
        require(msg.value == token.price, "Please submit the asking price in order to complete the purchase");

        token.currentlyListed = false;
        token.seller = payable(msg.sender);
        _itemsSold.increment();
        token.leaseContract.tenant = msg.sender;

        _transfer(address(this), msg.sender, tokenId);
        approve(address(this), tokenId);

        (bool ownerTransferSuccess, ) = payable(owner).call{value: listPrice}("");
        require(ownerTransferSuccess, "Transfer to owner failed");

        (bool sellerTransferSuccess, ) = payable(token.seller).call{value: msg.value}("");
        require(sellerTransferSuccess, "Transfer to seller failed");
    }

     ///////////////////////////// LEASE ///////////////////////////////////////

    function payRent(uint256 tokenId) public payable {
        ListedToken memory token = idToListedToken[tokenId];
        require(token.leaseContract.tenant == msg.sender, "You are not the tenant of this NFT");
        require(msg.value == token.leaseContract.rent, "Incorrect rent amount");
        require(block.timestamp <= token.leaseContract.nextPaymentDue || (token.leaseContract.paymentNoticeSent != 0 && block.timestamp <= token.leaseContract.paymentNoticeSent + 30 days), "Rent is late");
        token.leaseContract.nextPaymentDue = block.timestamp + token.leaseContract.leaseDuration;
        if (token.leaseContract.paymentNoticeSent != 0 && block.timestamp <= token.leaseContract.paymentNoticeSent + 30 days) {
            token.leaseContract.paymentNoticeSent = 0;
        }
        (bool ownerTransferSuccess, ) = token.owner.call{value: msg.value}("");
        require(ownerTransferSuccess, "Transfer to owner failed");
        emit RentPaid(msg.sender, tokenId, msg.value);
    }

    function sendPaymentNotice(uint256 tokenId) public {
        ListedToken storage token = idToListedToken[tokenId];
        require(block.timestamp >  token.leaseContract.nextPaymentDue, "Rent is not late");
        token.leaseContract.paymentNoticeSent = block.timestamp;
        emit PaymentNoticeSent(token.leaseContract.tenant, tokenId);
    }

    function checkRent(uint256 tokenId) public {
        ListedToken storage token = idToListedToken[tokenId];
        if (block.timestamp > token.leaseContract.nextPaymentDue && token.leaseContract.paymentNoticeSent > 0) {
            if (block.timestamp > token.leaseContract.paymentNoticeSent + 30 days) {
                token.leaseContract.tenant = address(0);
                token.leaseContract.nextPaymentDue = 0;
                token.leaseContract.paymentNoticeSent = 0;
                emit LeaseTerminated(token.leaseContract.tenant, tokenId);
            }
        }
    }

    function terminateLease(uint256 tokenId) public {
        ListedToken storage token = idToListedToken[tokenId];
        require(token.leaseContract.tenant == msg.sender, "You are not the tenant of this NFT");
        token.leaseContract.tenant = address(0);
        token.leaseContract.nextPaymentDue = 0;
        token.leaseContract.paymentNoticeSent = 0;
        emit LeaseTerminated(msg.sender, tokenId);
    }

    function withdrawRent(uint256 tokenId) public {
        ListedToken storage token = idToListedToken[tokenId];
        require(token.seller == msg.sender, "You are not the owner of this NFT");
        (bool ownerTransferSuccess, ) = token.seller.call{value: token.leaseContract.rent}("");
        require(ownerTransferSuccess, "Transfer to owner failed");
        token.leaseContract.rent = 0;
    }

}