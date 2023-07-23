import { useState } from "react";
import { Box, VStack, Flex, Heading, Spacer, Center, SlideFade } from "@chakra-ui/react";

// Hooks 
import useToasts from "../../hook/useToasts";
import useNFTStorage from "../../hook/data/useNFTStorage";
import useMintNFT from "../../hook/contract_action/useMintNFT";

// Components 
import ImageUploadField from "./ImageUploadField";
import TextField from "./TextField";
import SubmitButton from "./SubmitButton";

const CreationForm = ({ onSubmit }) => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const { showErrorToast, showSuccessToast } = useToasts();
  const { uploadToNFTStorage, isUploading } = useNFTStorage();
  const { mintNFT, isLoading, isSuccess, error, isError } = useMintNFT();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image || !description || !name) {
      showErrorToast("Please fill all fields.");
    } else {
      try {
        const metadata = await uploadToNFTStorage({ name, description, image });
        showSuccessToast("We've received your information.");
        onSubmit({
          image,
          description,
          name,
          tokenURI: metadata.url, 
        });
      } catch (error) {
        console.error(error);
        showErrorToast("There was an error uploading your NFT. Please try again.");
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
              <ImageUploadField onImageUpload={setImage} />
            </VStack>
            <Spacer />
            <VStack spacing={4}>
              <TextField id="description" label="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} tooltip="Describe your NFT" />
              <TextField id="name" label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} tooltip="Give a name to your NFT" />
              <SubmitButton isLoading={isLoading || isUploading} />
            </VStack>
          </Flex>
        </Box>
      </SlideFade>
    </Center>
  );
};

export default CreationForm;