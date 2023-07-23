import { Center, Text } from "@chakra-ui/react";

const WalletStatus = ({ isConnected, nftData }) => {
  if (!isConnected) {
    return (
      <Center p="2rem">
        <Text>Please connect your Wallet.</Text>
      </Center>
    );
  } else if (nftData.length === 0) {
    return (
      <Center p="2rem">
        <Text>Vous n'avez pas de NFT avec cette adresse</Text>
      </Center>
    );
  }

  // Si le portefeuille est connecté et qu'il y a des NFTs, nous ne retournons rien.
  return null;
};

export default WalletStatus;