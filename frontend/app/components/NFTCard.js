import React, { useState } from 'react';
import { Image, Heading, Text, Button, Divider, Card, CardBody, CardFooter, Stack, Box } from "@chakra-ui/react";
import { formatEther } from "viem";
import SellModal from './SellModal'; 

const NFTCard = ({ nft }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSellNow = () => {
    setIsModalOpen(true);
  };

  return (
    <Card maxW='sm' bg='white' boxShadow='lg' borderRadius='lg'>
      <CardBody>
        <Image
          src={nft.image.startsWith('ipfs') ? `https://ipfs.io/ipfs/${nft.image.split('//')[1]}` : nft.image}
          alt={nft.name}
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='lg' lineHeight='shorter' letterSpacing='-.1rem'>{nft.name}</Heading>
          <Text fontSize='sm' color='gray.500'>ID: {nft.id}</Text>
          <Box as='span' bg='gray.50' p='2' borderRadius='md' color='gray.700' lineHeight='tall' boxShadow='md'>
            {nft.description}
          </Box>
          <Box as="span" color='blue.600' fontSize='xl' fontWeight='bold'>Price: {formatEther(nft.price)} ETH</Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
          <Button variant='solid' colorScheme='blue' onClick={handleSellNow}>
            Sell now
          </Button>
      </CardFooter>
      <SellModal nft={nft} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};

export default NFTCard;