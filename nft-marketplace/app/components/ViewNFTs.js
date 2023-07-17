import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function ViewNFTs() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      // TODO: Replace with your contract's ABI
      const contractABI = []; 
      // TODO: Replace with your contract's address
      const contractAddress = '0xYourContractAddress'; 

      // We're hardcoding the provider for simplicity
      // In a production application, you'll want to prompt the user to connect their wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        const nfts = await contract.getAllNFTs();
        setNfts(nfts);
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      {nfts.map((nft, index) => (
        <div key={index}>
          <h2>{nft.tokenId}</h2>
          <p>Price: {ethers.utils.formatEther(nft.price)} ETH</p>
          <p>Rent: {ethers.utils.formatEther(nft.leaseContract.rent)} ETH per {nft.leaseContract.leaseDuration} seconds</p>
        </div>
      ))}
    </div>
  );
}

export default ViewNFTs;