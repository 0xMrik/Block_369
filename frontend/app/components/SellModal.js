import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";
import useListNFT from '../hook/contract_action/useListNFT';
import { parseEther } from 'viem';
import useToasts from '../hook/useToasts';
import { useState } from "react";

const SellModal = ({ nft, isOpen, onClose }) => {
  const [price, setPrice] = useState("");
  const { showErrorToast, showSuccessToast } = useToasts();
  
  const { listNFT, isLoading, error } = useListNFT({
    onError: (error) => showErrorToast(error.message),
    onSuccess: () => showSuccessToast("Your NFT has been listed for sale successfully!")
  });

  const handleConfirm = () => {
    if (!price) {
      return showErrorToast("You must enter a price.");
    }

    const priceInWei = parseEther(price);
    console.log('nft.id:', nft.id, 'priceInWei:', priceInWei); // log values

    if (priceInWei < BigInt(0)) {
      return showErrorToast("Price must be greater than 0");
    }

    listNFT(nft.id, priceInWei);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>List your NFT for sale</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Enter the price for your NFT</FormLabel>
            <Input placeholder="Price in Ether" onChange={(e) => setPrice(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirm} isLoading={isLoading}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SellModal;