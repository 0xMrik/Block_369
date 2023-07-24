import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import contractABI from '../../../contract-abi.json';
import { parseUnits } from 'viem';

export default function useBuyNFT({ onError, onSuccess }) {
    const [tokenDetails, setTokenDetails] = useState(null);
    
    const args = tokenDetails ? [tokenDetails.id] : [];
    const enabled = !!tokenDetails;

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi: contractABI.abi,
        functionName: 'buyNFT',
        args,
        enabled,
        value: tokenDetails ? parseUnits(tokenDetails.price.toString(), 'ether') : undefined,
    });

    const { data, error, isError, write } = useContractWrite({ ...config, onError, onSuccess });
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

    const buyNFT = (tokenId, price) => {
        setTokenDetails({ id: tokenId, price });
        if (typeof write === 'function') {
            write();
        }
    };

    return {
        buyNFT,
        isLoading,
        isSuccess,
        error: prepareError || error,
        isError: isPrepareError || isError,
    };
}