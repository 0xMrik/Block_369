import { useState } from 'react';
import { uploadJSONToIPFS, uploadFileToIPFS } from '../../pinata'
import { Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, VStack, InputGroup, InputRightElement, Text, Textarea, Center, Stack } from "@chakra-ui/react"
import { MintNFTButton } from './MintNFTButton';

const CreateNFT = () => {
  const [image, setImage] = useState();
  const [tokenURI, setTokenURI] = useState();
  const [tokenData, setTokenData] = useState({
    name: '',
    description: '',
    price: '',
    leaseDuration: ''
  });

  const uploadImage = async () => {
    const response = await uploadFileToIPFS(image);
    if (response.success) {
      setTokenURI(response.pinataURL);
      toast({
        title: "Image uploaded successfully.",
        description: `Image is available at ${response.pinataURL}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      console.error(response.message);
      toast({
        title: "Image upload failed.",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setTokenData({
      ...tokenData,
      [e.target.name]: e.target.value
    });
  }


  return (
    <Center>
      <Box p="2rem" w="50%" mt="2rem">
        <Text textAlign="center" fontSize="2xl" mb="2rem">Upload your NFT to the marketplace</Text>
        <VStack spacing={4}>
          <FormControl id="tokenURI">
            <FormLabel>NFT Name</FormLabel>
            <Input type="text" name="name" value={tokenData.name} onChange={handleChange} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>NFT Description</FormLabel>
            <Textarea name="description" value={tokenData.description} onChange={handleChange} />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price (in ETH)</FormLabel>
            <NumberInput precision={2}>
              <NumberInputField name="price" value={tokenData.price} onChange={handleChange} />
            </NumberInput>
          </FormControl>
          <FormControl id="leaseDuration">
            <FormLabel>Lease Duration</FormLabel>
            <NumberInput>
              <NumberInputField name="leaseDuration" value={tokenData.leaseDuration} onChange={handleChange} />
            </NumberInput>
          </FormControl>
          <Stack direction="row" spacing={4}>
            <Input type="file" onChange={event => setImage(event.target.files[0])} />
            <Button colorScheme="blue" onClick={uploadImage}>Upload</Button>
          </Stack>
          <MintNFTButton tokenData={tokenData} />
        </VStack>
      </Box>
    </Center>
  )
}

export default CreateNFT