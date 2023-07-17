import React from 'react';

function NFTListLayout({ children }) {
  return (
    <div>
      <h2>Shared UI for NFTList pages</h2>
      {children}
    </div>
  );
}

export default NFTListLayout;