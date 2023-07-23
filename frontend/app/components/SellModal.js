import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";
import useListNFT from '../hook/useListNFT';
import { parseEther } from 'viem';
import { useEffect, useState } from 'react';
import useToasts from '../hook/useToasts';

const SellModal = ({ nft, isOpen, onClose }) => {
  const [price, setPrice] = useState("");
  const { listNFT, isLoading, isSuccess, error, isError } = useListNFT();
  const { showErrorToast, showSuccessToast } = useToasts();

  useEffect(() => {
    console.log('isError:', isError, 'isSuccess:', isSuccess, 'error:', error); // log values

    if (isError) {
      showErrorToast(error.message);
    }

    if (isSuccess) {
      showSuccessToast("Your NFT has been listed for sale successfully!");
      onClose();
    }
  }, [isError, isSuccess, error, onClose, showErrorToast, showSuccessToast]);

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