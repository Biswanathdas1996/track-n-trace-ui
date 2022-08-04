// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract TrackNTrace is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    uint[] public nftTokenList;
    Counters.Counter private _tokenIds;
  
    constructor() ERC721("Frame", "TCUR") {}

    function createTrack(string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        nftTokenList.push(newItemId);
        return newItemId;
    }
    
    function addData(uint tokenId, string memory tokenURI ) public returns (string memory){
       _setTokenURI(tokenId, tokenURI);
       return tokenURI;
    }

    function getToken() public view returns (uint[] memory) {
        return  nftTokenList;
    }
  
}