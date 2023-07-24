import { useState } from "react";
import { Box, VStack, Flex, Heading, Spacer, Center, SlideFade, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Hooks 
import useToasts from "../../hook/useToasts";
import useNFTStorage from "../../hook/data/useNFTStorage";
import useMintNFT from "../../hook/contract_action/useMintNFT";

// Components 
import ImageUploadField from "./ImageUploadField";
import TextField from "./TextField";

const CreationForm = ({ onSubmit }) => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tokenURI, setTokenURI] = useState(null);
  const { showErrorToast, showSuccessToast } = useToasts();
  const { uploadToNFTStorage, isUploading } = useNFTStorage();
  
  const { mintNFT, isLoading: isMinting, isSuccess: isMintSuccess, error: mintError, isError: isMintError } = useMintNFT({
    onError: () => showErrorToast("There was an error minting your NFT."),
    onSuccess: () => showSuccessToast("Your NFT was minted successfully!")
  });

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!image || !description || !name) {
      return showErrorToast("Please fill all fields.");
    } 
      
    try {
      const metadata = await uploadToNFTStorage({ name, description, image });
      if (!metadata) throw new Error("Failed to upload metadata.");
      showSuccessToast("We've received your information.");
      setTokenURI(metadata.url);
    } catch (error) {
      console.error(error);
      showErrorToast("There was an error uploading your NFT. Please try again.");
    }
  };

  const handleMint = (event) => {
    event.preventDefault();
    mintNFT(tokenURI);
  };

  return (
    <Center h="100vh">
      <SlideFade in={true} offsetY="20px">
        <Box as="form" onSubmit={handleUpload} p={5} shadow="md" borderWidth="1px">
          <Heading mb={5}>Create a new NFT</Heading>
          <Flex>
            <VStack spacing={4} mr={5}>
              <ImageUploadField onImageUpload={setImage} />
            </VStack>
            <Spacer />
            <VStack spacing={4}>
              <TextField id="description" label="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} tooltip="Describe your NFT" />
              <TextField id="name" label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} tooltip="Give a name to your NFT" />
              {!tokenURI ? 
                <Button leftIcon={<CheckIcon />} colorScheme="teal" variant="solid" type="submit" onClick={handleUpload} isLoading={ isUploading}>
                  Upload
                </Button> 
                :
                <Button leftIcon={<CheckIcon />} colorScheme="teal" variant="solid" type="submit" onClick={handleMint} isLoading={ isMinting}>
                  Mint
                </Button>
              }
            </VStack>
          </Flex>
        </Box>
      </SlideFade>
    </Center>
  );
};

export default CreationForm;