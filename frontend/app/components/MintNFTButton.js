import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { Button, useToast } from '@chakra-ui/react';
import contractABI from '../../contract-abi.json'

export function MintNFTButton({ tokenData }) {
  const { isConnected } = useAccount();
  const toast = useToast();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: contractABI,
    functionName: 'createToken',
    args: [tokenData.tokenURI, tokenData.price, tokenData.rent, tokenData.leaseDuration], 
    enabled: Boolean(tokenData),
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleClick = () => {
    if (!isConnected) {
      toast({
        title: "Erreur",
        description: "Connectez votre portefeuille d'abord",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      write();
    }
  }

  return (
    <div>
      <Button colorScheme='red' onClick={handleClick}>Mint</Button>
    </div>
  )
}