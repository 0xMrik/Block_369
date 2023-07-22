import { Grid, GridItem, Box, Image, Text, Badge, Container } from '@chakra-ui/react';

const AllNFT = () => {


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