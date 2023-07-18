import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { Box, Text } from '@chakra-ui/react';

const OwnNFT = () => {
  const { account, isConnected } = useAccount();
  const [nfts, setNFTs] = useState([]);
  const [error, setError] = useState(null);

  const { data: myNFTs } = useContractRead({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // Adresse de votre contrat
    abi: [
      {
        name: 'getMyNFTs',
        type: 'function',
        outputs: [
          {
            type: 'tuple[]',
            components: [
              { type: 'string', name: 'tokenURI' },
              { type: 'uint256', name: 'price' },
              { type: 'uint256', name: 'rent' },
              { type: 'uint256', name: 'leaseDuration' },
            ],
          },
        ],
      },
    ],
    functionName: 'getMyNFTs',
    args: [], // Les arguments si nécessaire
    enabled: isConnected, // Assurez-vous que le contrat n'est appelé que si le wallet est connecté
  });

  useEffect(() => {
    if (myNFTs) {
      setNFTs(myNFTs.map((nft) => ({ ...nft, owner: account })));
      setError(null); // Réinitialiser l'erreur si les NFT sont récupérés avec succès
    }
  }, [myNFTs, account]);

  useEffect(() => {
    if (!isConnected) {
      setError("Connectez votre wallet pour afficher les NFT");
    } else if (myNFTs && myNFTs.length === 0) {
      setError("Aucun NFT trouvé dans votre wallet");
    } else {
      setError(null); // Réinitialiser l'erreur lorsque le wallet est connecté et des NFT sont récupérés
    }
  }, [isConnected, myNFTs]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
      {error ? (
        <Box p="4" border="1px solid red">
          <Text fontSize="xl" color="red">
            {error}
          </Text>
        </Box>
      ) : (
        <div>
          <Text fontSize="xl" mb="4">Mes NFTs :</Text>
          {nfts.map((nft) => (
            <Box key={nft.tokenId} p="4" border="1px solid gray" mb="4">
              <Text>Token ID: {nft.tokenId}</Text>
              <Text>Owner: {nft.owner}</Text>
              {/* Ajoutez d'autres informations NFT si nécessaire */}
            </Box>
          ))}
        </div>
      )}
    </Box>
  );
};

export default OwnNFT;