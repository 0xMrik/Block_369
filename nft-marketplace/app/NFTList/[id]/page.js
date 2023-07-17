"use client"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function NFTPage() {
  const router = useRouter();
  const { id } = router.query;
  const [nft, setNft] = useState(null);

  // Fetch NFT data from your smart contract using the ID
  useEffect(() => {
    if (id) {
      // fetchNft is a function that you would define to interact with your smart contract
      const fetchedNft = fetchNft(id);
      setNft(fetchedNft);
    }
  }, [id]);

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display NFT details here */}
      <h1>{nft.name}</h1>
      <p>{nft.description}</p>
      {/* Add more NFT details as needed */}
    </div>
  );
}

export default NFTPage;