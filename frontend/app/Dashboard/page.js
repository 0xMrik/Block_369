"use client"
import { Spinner, SimpleGrid, Text,Divider } from "@chakra-ui/react";
import useOwnedNFTs from '../hook/data/useOwnedNFTs';
import useOwnedListedNFTs from "../hook/data/useOwnedListedNFT";
import useNFTData from '../hook/data/useNFTData';
import NFTCard from '../components/NFTCard';
import Header from '../components/Header';
import { useAccount } from 'wagmi';
import WalletStatus from '../components/WalletStatus';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const { ownedNFTs, loading } = useOwnedNFTs();
  const { OwnedListedNFTs } = useOwnedListedNFTs()
  const nftData = useNFTData(ownedNFTs);
  const nftData_OLNFT = useNFTData(OwnedListedNFTs)

  console.log("nftData_OLNFT :",nftData_OLNFT)

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      <Header />
      <WalletStatus isConnected={isConnected} nftData={nftData} />
      {isConnected && nftData.length > 0 && (
        <>
          <Text textAlign="center" mt="2rem" fontSize="xl" fontWeight="bold" color="blue.500">Vos NFTs non listés:</Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt="2rem" padding="20px">
            {nftData.map((nft, index) => <NFTCard key={index} nft={nft} />)}
          </SimpleGrid>
          <Divider />
          <Text textAlign="center" mt="2rem" fontSize="xl" fontWeight="bold" color="green.500">Vos NFTs en vente :</Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt="2rem" padding="20px">
            {nftData_OLNFT.map((nft, index) => <NFTCard key={index} nft={nft} />)}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Dashboard;