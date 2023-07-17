"use client"
import React, { useState } from 'react';
import { ethers } from 'ethers';

function CreateNFT() {
  const [tokenURI, setTokenURI] = useState('');
  const [price, setPrice] = useState('');
  const [rent, setRent] = useState('');
  const [leaseDuration, setLeaseDuration] = useState('');

  const createNFT = async () => {
    // TODO: Replace with your contract's ABI
    const contractABI = []; 
    // TODO: Replace with your contract's address
    const contractAddress = '0xYourContractAddress'; 

    // We're hardcoding the provider for simplicity
    // In a production application, you'll want to prompt the user to connect their wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const transaction = await contract.createToken(tokenURI, ethers.utils.parseEther(price), ethers.utils.parseEther(rent), leaseDuration);
      await transaction.wait();
      alert('NFT created!');
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Token URI" value={tokenURI} onChange={e => setTokenURI(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="text" placeholder="Rent" value={rent} onChange={e => setRent(e.target.value)} />
      <input type="text" placeholder="Lease Duration" value={leaseDuration} onChange={e => setLeaseDuration(e.target.value)} />
      <button onClick={createNFT}>Create NFT</button>
    </div>
  );
}

export default CreateNFT;