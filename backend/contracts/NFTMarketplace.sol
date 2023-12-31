// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTMarket
 * @dev Contract for creating, listing, buying and cancelling NFTs.
 */
contract NFTMarket is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  Counters.Counter private _tokenIDs;

  // Struct for NFT listings
  struct NFTListing {
    uint256 price;
    address seller;
  }

  // Mapping from token ID to NFT listings
  mapping(uint256 => NFTListing) private _listings;

  /**
   * @dev Emitted when an NFT is transferred.
   * if tokenURI is not an empty string => an NFT was created
   * if price is not 0 => an NFT was listed
   * if price is 0 && tokenURI is an empty string => NFT was transferred (either bought, or the listing was canceled)
   */
  event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

  /**
   * @dev Constructor function.
   */
  constructor() ERC721("Block369's NFTs", "BNFT") {}

  /**
   * @dev Function to create an NFT.
   * @param tokenURI string URI for the token to be created.
   */
  function createNFT(string calldata tokenURI) public  {
      _tokenIDs.increment();
      uint256 currentID = _tokenIDs.current();
      _safeMint(msg.sender, currentID);
      _setTokenURI(currentID, tokenURI);
      emit NFTTransfer(currentID, address(0),msg.sender, tokenURI, 0);
  }

  /**
   * @dev Function to list an NFT for sale.
   * @param tokenID uint256 ID of the token to be listed.
   * @param price uint256 price for the listed token.
   */
  function listNFT(uint256 tokenID, uint256 price) public {
    require(price > 0, "NFTMarket: price must be greater than 0");
    transferFrom(msg.sender, address(this), tokenID);
    _listings[tokenID] = NFTListing(price, msg.sender);
    emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
  }

  /**
   * @dev Function to buy an NFT.
   * @param tokenID uint256 ID of the token to be bought.
   */
  function buyNFT(uint256 tokenID) public payable {
     NFTListing memory listing = _listings[tokenID];
     require(listing.price > 0, "NFTMarket: nft not listed for sale");
     require(msg.value == listing.price, "NFTMarket: incorrect price");
     ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
     clearListing(tokenID);
     payable(listing.seller).transfer(listing.price.mul(95).div(100));
     emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
  }

  /**
   * @dev Function to cancel a listing.
   * @param tokenID uint256 ID of the token whose listing is to be cancelled.
   */
  function cancelListing(uint256 tokenID) public {
     NFTListing memory listing = _listings[tokenID];
     require(listing.price > 0, "NFTMarket: nft not listed for sale");
     require(listing.seller == msg.sender, "NFTMarket: you're not the seller");
     ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
     clearListing(tokenID);
     emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
  }

  /**
   * @dev Function to withdraw funds from the contract.
   */
  function withdrawFunds() public onlyOwner {
    uint256 balance =  address(this).balance;
    require(balance > 0, "NFTMarket: balance is zero");
    payable(msg.sender).transfer(balance); 
  }

  /**
   * @dev Internal function to clear a listing.
   * @param tokenID uint256 ID of the token whose listing is to be cleared.
   */
  function clearListing(uint256 tokenID) private {
    _listings[tokenID].price = 0;
    _listings[tokenID].seller= address(0);
  }
}

