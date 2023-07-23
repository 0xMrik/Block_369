"use client"
import { Spinner, SimpleGrid, Text } from "@chakra-ui/react";
import useOwnedNFTs from '../hook/useOwnedNFTs';
import useNFTData from '../hook/useNFTData';
import NFTCard from '../components/NFTCard';
import Header from '../components/Header';
import { useAccount } from 'wagmi';
import WalletStatus from '../components/WalletStatus';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const { ownedNFTs, loading } = useOwnedNFTs();
  const nftData = useNFTData(ownedNFTs);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      <Header />
      <WalletStatus isConnected={isConnected} nftData={nftData} />
      {isConnected && nftData.length > 0 && (
        <>
          <Text textAlign="center" mt="2rem">Vos NFTs :</Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt="2rem" padding="20px">
            {nftData.map((nft, index) => <NFTCard key={index} nft={nft} />)}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Dashboard;