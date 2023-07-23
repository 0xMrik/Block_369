"use client"
import Header from '../components/Header'
import { useAccount } from 'wagmi'
import { Flex, Text } from "@chakra-ui/react"
import CreationForm from '../components/CreationForm'
import useMintNFT from '../hook/contract_action/useMintNFT' 

export default function Home() {
  const { isConnected } = useAccount()
  const { mintNFT } = useMintNFT() 

  const handleFormSubmit = ({ image, description, name, tokenURI }) => {
    console.log("Token URI in handleFormSubmit:", tokenURI);
    mintNFT(tokenURI); 
  };

  return (
    <>
      <Header />
      {isConnected ? (
        <CreationForm onSubmit={handleFormSubmit} />
      ) : (
        <Flex p="2rem" justifyContent="center" alignItems="center">
          <Text>Please connect your Wallet.</Text>
        </Flex>
      )}
    </>
  )
}