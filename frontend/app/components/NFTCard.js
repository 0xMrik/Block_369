import React, { useState } from 'react';
import { Image, Heading, Text, Button, Divider, Card, CardBody, CardFooter, Stack, Box } from "@chakra-ui/react";
import { formatEther } from "viem";
import SellModal from './SellModal';
import useCancelListing from '../hook/contract_action/useCancelNFTListing';
import useToasts from '../hook/useToasts';
import { useAccount } from 'wagmi';
import useBuyNFT from '../hook/contract_action/useBuyNFT';


const NFTCard = ({ nft }) => {
  const { address } = useAccount();
  if(nft.from === address) {
    console.log('SUCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showErrorToast, showSuccessToast } = useToasts();

  const { cancelListing, isLoading: cancelIsLoading } = useCancelListing({
    onError: (error) => showErrorToast(error.message),
    onSuccess: () => {
      showSuccessToast("Your NFT listing has been cancelled successfully!")
    }
  });

  const { buyNFT, isLoading: buyIsLoading } = useBuyNFT({
    onError: (error) => showErrorToast(error.message),
    onSuccess: () => {
      showSuccessToast("Your NFT was purchased successfully!")
    }
  });

  const handleSellNow = () => {
    setIsModalOpen(true);
  };

  const handleUnlistNow = () => {
    cancelListing(nft.id);
  };

  const handleBuyNow = () => {
    buyNFT(nft.id, nft.price);
  };
  console.log("nft price --------------> ", { nft })
  return (
    <Card maxW='sm' bg='white' boxShadow='0 0 30px 10px rgba(0,0,0,0.15)' borderRadius='lg'>
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
        <CardFooter>
          {nft.price > 0 ? (
            <Stack direction="row" spacing={4}>
              <Button variant='solid' colorScheme='red' onClick={handleUnlistNow}>
                Unlist
              </Button>
              <Button variant='solid' colorScheme='green' onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Stack>
          ) : (
            <Button variant='solid' colorScheme='blue' onClick={handleSellNow}>
              Sell now
            </Button>
          )}
        </CardFooter>
      </CardFooter>
      <SellModal nft={nft} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};


export default NFTCard;