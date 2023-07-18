import { Grid, GridItem, Box, Image, Text, Badge, Container } from '@chakra-ui/react';

const AllNFT = () => {
  const nfts = [
    {
      id: 1,
      name: 'NFT 1',
      description: 'Spacious commercial space for rent',
      price: '0.05 ETH',
      leaseDuration: '30 days',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'NFT 2',
      description: 'Modern retail space in prime location',
      price: '0.1 ETH',
      leaseDuration: '60 days',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'NFT 3',
      description: 'Cozy office space with great amenities',
      price: '0.03 ETH',
      leaseDuration: '90 days',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'NFT 4',
      description: 'Stylish storefront in downtown area',
      price: '0.08 ETH',
      leaseDuration: '45 days',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'NFT 5',
      description: 'Industrial warehouse for commercial use',
      price: '0.15 ETH',
      leaseDuration: '75 days',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'NFT 6',
      description: 'Charming cafe with outdoor seating',
      price: '0.07 ETH',
      leaseDuration: '60 days',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <Container maxW="90%" marginTop="2rem">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {nfts.map((nft) => (
          <GridItem key={nft.id}>
            <Box borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image src={nft.imageUrl} alt={nft.name} width="100%" height="auto" />
              <Box p="4">
                <Text fontSize="lg" fontWeight="bold" mb="2">
                  {nft.name}
                </Text>
                <Text fontSize="md" mb="2">
                  {nft.description}
                </Text>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb="4">
                  <Text fontSize="lg" fontWeight="bold">
                    Price: {nft.price}
                  </Text>
                  <Badge colorScheme="blue">Lease Duration: {nft.leaseDuration}</Badge>
                </Box>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default AllNFT;