import { Image, Heading, Text, Button, ButtonGroup, Divider, Card, CardBody, CardFooter, Spinner, SimpleGrid, Stack, Flex, Spacer } from "@chakra-ui/react";
import useOwnedNFTs from "../hook/useOwnedNFTs";
import { useEffect, useState } from 'react';
import axios from 'axios';

const OwnNFT = () => {
  const { ownedNFTs, loading } = useOwnedNFTs();
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await Promise.all(ownedNFTs.map(async (nft) => {
        const ipfsCID = nft.tokenURI.split('//')[1];
        const metadataUrl = `https://ipfs.io/ipfs/${ipfsCID}`;
        let response = await axios.get(metadataUrl);
        return { ...response.data, id: nft.id, price: nft.price };
      }));
      setNftData(data);
    };
    fetchData();
  }, [ownedNFTs]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Flex direction="column" align="center" mt={10}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {nftData.map((nft, index) => (
          <Card key={index} maxW='sm'>
            <CardBody>
              <Image
                src={nft.image.startsWith('ipfs') ? `https://ipfs.io/ipfs/${nft.image.split('//')[1]}` : nft.image}
                alt={nft.name}
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>NFT ID: {nft.id}</Heading>
                <Text>Name: {nft.name}</Text>
                <Text>Description: {nft.description}</Text>
                <Text>Token URI: {nft.tokenURI}</Text>
                <Text color='blue.600' fontSize='2xl'>Price: {nft.price}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                  Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Spacer />
    </Flex>
  );
};

export default OwnNFT;