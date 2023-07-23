import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import contractABI from '../../../contract-abi.json';
import { useState } from 'react';

export default function useCancelListing({ onError, onSuccess } = {}) {
    const [tokenId, setTokenId] = useState(null);

    const args = tokenId ? [tokenId] : [];
    const enabled = !!tokenId;

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi: contractABI.abi,
        functionName: 'cancelListing',
        args,
        enabled,
    });

    const { data, error, isError, write } = useContractWrite({ ...config, onError, onSuccess });
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

    const cancelListing = (tokenId) => {
        setTokenId(tokenId);
        // Call write directly after setting the tokenId
        if (typeof write === 'function') {
            write();
        }
    };

    return {
        cancelListing,
        isLoading,
        isSuccess,
        error: prepareError || error,
        isError: isPrepareError || isError,
    };
}