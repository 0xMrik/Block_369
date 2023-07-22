import { useState } from "react";
import { Box, Button, Image, Input, VStack, Flex, Heading, Spacer, useToast, Center, Tooltip, SlideFade, FormControl, FormLabel } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { NFTStorage, File } from 'nft.storage'

const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY });

const CreationForm = ({ onSubmit }) => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const toast = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setPreview(reader.result);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image || !description || !name) {
      toast({
        title: "Error.",
        description: "Please fill all fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      try {
        const file = new File([image], "nft-image", { type: image.type });
        const metadata = await client.store({
          name,
          description,
          image: file,
        });
        toast({
          title: "Form submitted.",
          description: "We've received your information.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onSubmit({
          image,
          description,
          name,
          tokenURI: metadata.url, 
        });
        setImage("");
        setDescription("");
        setName("");
        setPreview("");
      } catch (error) {
        console.error("Failed to upload to NFT.Storage:", error);
        toast({
          title: "Upload failed.",
          description: "There was an error uploading your NFT. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Center h="100vh">
      <SlideFade in={true} offsetY="20px">
        <Box as="form" onSubmit={handleSubmit} p={5} shadow="md" borderWidth="1px">
          <Heading mb={5}>Create a new NFT</Heading>
          <Flex>
            <VStack spacing={4} mr={5}>
              <FormControl id="image-upload">
                <FormLabel fontSize="xl">Upload Image:</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                {preview && <Image boxSize="200px" src={preview} alt="preview" />}
              </FormControl>
            </VStack>
            <Spacer />
            <VStack spacing={4}>
              <FormControl id="description">
                <FormLabel fontSize="xl">Description:</FormLabel>
                <Tooltip label="Describe your NFT" aria-label="A tooltip">
                  <Input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <FormControl id="name">
                <FormLabel fontSize="xl">Name:</FormLabel>
                <Tooltip label="Give a name to your NFT" aria-label="A tooltip">
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Tooltip>
              </FormControl>
              <Button leftIcon={<CheckIcon />} colorScheme="teal" variant="solid" type="submit">
                Create
              </Button>
            </VStack>
          </Flex>
        </Box>
      </SlideFade>
    </Center>
  );
};

export default CreationForm;