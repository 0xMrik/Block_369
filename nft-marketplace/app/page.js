"use client"
import Link from 'next/link'
import ViewNFTs from './components/ViewNFTs';

function HomePage() {
  return (
    <div>
      <h1>Welcome to NFT Marketplace</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/NFT">
              NFT
            </Link>
          </li>
          <li>
            <Link href="/NFTList">
              NFT List
            </Link>
          </li>
          <li>
            <Link href="/CreateNFT">
              Create NFT
            </Link>
          </li>
        </ul>
      </nav>
      <ViewNFTs />
    </div>
  );
}

export default HomePage;