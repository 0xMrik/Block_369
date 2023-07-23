import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import contractABI from '../../../contract-abi.json'

export default function useMintNFT() {
    const [tokenURI, setTokenURI] = useState(null);
    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi: contractABI.abi,
        functionName: 'createNFT',
        args: [tokenURI],
        enabled: Boolean(tokenURI),
    });

    const { data, error, isError, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    const mintNFT = (uri) => {
        setTokenURI(uri);
        write();
    };

    return {
        mintNFT,
        isLoading,
        isSuccess,
        error: prepareError || error,
        isError: isPrepareError || isError,
    };
}