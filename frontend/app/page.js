"use client"
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

import Header from './components/Header';
import NFTCard from './components/NFTCard';
import { useAccount } from 'wagmi';
import useListedNFTs from "./hook/data/useListedNFT";
import useNFTData from "./hook/data/useNFTData";

export default function Home() {
  const { isConnected } = useAccount();

  const { ListedNFTs } = useListedNFTs()
  const nftData = useNFTData(ListedNFTs);


  return (
    <>
      <Header />
      <>
        {isConnected ? (
          <>
            <Text textAlign="center" mt="2rem" fontSize="xl" fontWeight="bold" color="blue.500">Bienvenue sur Block369 !</Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt="2rem" padding="20px">
              {nftData.map((nft, index) => <NFTCard key={index} nft={nft} />)}
            </SimpleGrid>
          </>
        ) : (
          <Flex p="2rem" justifyContent="center" alignItems="center">
            <Text>Please connect your Wallet.</Text>
          </Flex>
        )}
      </>
    </>
  )
}