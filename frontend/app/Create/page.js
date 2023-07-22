"use client"

import Header from '../components/Header'
import { useAccount } from 'wagmi'
import { Flex, Text } from "@chakra-ui/react"
import CreationForm from '../components/CreationForm'

export default function Home() {
  const { isConnected } = useAccount()

  const handleFormSubmit = ({ image, description, name, tokenURI }) => {
    console.log("Token URI:", tokenURI);
    // Ici, vous pouvez utiliser les données du formulaire pour écrire sur le smart-contract avec wagmi
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