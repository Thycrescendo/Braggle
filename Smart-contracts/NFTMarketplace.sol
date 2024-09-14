pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;
    mapping(address => uint256[]) public sellerListings;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTSold(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings.push(Listing(msg.sender, nftContract, tokenId, price));
        sellerListings[msg.sender].push(listings.length - 1);

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 listingId) external payable {
        Listing memory listing = listings[listingId];
        require(msg.value >= listing.price, "Insufficient payment");

        payable(listing.seller).transfer(listing.price);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTSold(msg.sender, listing.nftContract, listing.tokenId, listing.price);
        // Remove listing from arrays (omitted for brevity)
    }

    function getListings() external view returns (Listing[] memory) {
        return listings;
    }
}
