// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketV2 is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  Counters.Counter private _tokenIDs;

  struct NFTListing {
    uint256 price;
    address seller;
  }

  // New struct for rental information
  struct NFTLease {
    uint256 monthlyPayment;
    uint256 leaseStart;
    uint256 leaseEnd;
    address tenant;
  }

  mapping(uint256 => NFTListing) private _listings;
  // New mapping for rental information
  mapping(uint256 => NFTLease) private _leases;

  event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);
  // New event for lease payments
  event LeasePayment(uint256 tokenID, address from, address to, uint256 payment);

  constructor() ERC721("Block369's NFTs", "BNFT") {}

    function createNFT(string calldata tokenURI) public  {
      _tokenIDs.increment();
      uint256 currentID = _tokenIDs.current();
      _safeMint(msg.sender, currentID);
      _setTokenURI(currentID, tokenURI);
      emit NFTTransfer(currentID, address(0),msg.sender, tokenURI, 0);
  }

  function listNFT(uint256 tokenID, uint256 price) public {
    require(price > 0, "NFTMarket: price must be greater than 0");
    transferFrom(msg.sender, address(this), tokenID);
    _listings[tokenID] = NFTListing(price, msg.sender);
    emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
  }

  function buyNFT(uint256 tokenID) public payable {
     NFTListing memory listing = _listings[tokenID];
     require(listing.price > 0, "NFTMarket: nft not listed for sale");
     require(msg.value == listing.price, "NFTMarket: incorrect price");

     // Clear the listing before making the external call
     clearListing(tokenID);

     // Use call instead of transfer
     (bool success, ) = payable(listing.seller).call{value: listing.price.mul(95).div(100)}("");
     require(success, "NFTMarket: Transfer failed");

     ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
     emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
  }

  function cancelListing(uint256 tokenID) public {
     NFTListing memory listing = _listings[tokenID];
     require(listing.price > 0, "NFTMarket: nft not listed for sale");
     require(listing.seller == msg.sender, "NFTMarket: you're not the seller");

     // Clear the listing before making the external call
     clearListing(tokenID);

     ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
     emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
  }

  function withdrawFunds() public onlyOwner {
    uint256 balance =  address(this).balance;
    require(balance > 0, "NFTMarket: balance is zero");

    // Use call instead of transfer
    (bool success, ) = payable(msg.sender).call{value: balance}("");
    require(success, "NFTMarket: Transfer failed");
  }

  function clearListing(uint256 tokenID) private {
    _listings[tokenID].price = 0;
    _listings[tokenID].seller= address(0);
  }
    // New function for lease payments
  function payLease(uint256 tokenID) public payable {
    NFTLease memory lease = _leases[tokenID];
    require(lease.tenant == msg.sender, "NFTMarket: you're not the tenant");
    require(lease.leaseStart <= block.timestamp && block.timestamp <= lease.leaseEnd, "NFTMarket: lease not active");
    require(msg.value == lease.monthlyPayment, "NFTMarket: incorrect payment");

    // Use call instead of transfer
    (bool success, ) = payable(ownerOf(tokenID)).call{value: msg.value}("");
    require(success, "NFTMarket: Transfer failed");

    emit LeasePayment(tokenID, msg.sender, ownerOf(tokenID), msg.value);
  }
}

