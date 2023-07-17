import React from 'react';

function NFT({ nft }) {
  return (
    <div>
      <h2>{nft.name}</h2>
      <p>{nft.description}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default NFT;