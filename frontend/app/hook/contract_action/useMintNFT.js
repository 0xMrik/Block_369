import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import contractABI from '../../../contract-abi.json';

export default function useMintNFT({ onError, onSuccess } = {}) {
    const [tokenURI, setTokenURI] = useState(null);

    const args = tokenURI ? [tokenURI] : [];
    const enabled = !!tokenURI;

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi: contractABI.abi,
        functionName: 'createNFT',
        args,
        enabled,
    });

    const { data, error, isError, write } = useContractWrite({ ...config, onError, onSuccess });
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

    const mintNFT = (uri) => {
        setTokenURI(uri);
        if (typeof write === 'function') {
            write();
        }
    };

    return {
        mintNFT,
        isLoading,
        isSuccess,
        error: prepareError || error,
        isError: isPrepareError || isError,
    };
}