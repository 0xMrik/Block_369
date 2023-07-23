import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import contractABI from '../../../contract-abi.json';
import { parseUnits } from 'viem';

export default function useListNFT({onError, onSuccess}) {
    const [tokenDetails, setTokenDetails] = useState(null);

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi: contractABI.abi,
        functionName: 'listNFT',
        args: tokenDetails ? [tokenDetails.id, parseUnits(tokenDetails.price.toString(), 'ether')] : [],
        enabled: !!tokenDetails, 
    });

    const { data, error, isError, write } = useContractWrite({ ...config, onError, onSuccess });

    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

    const listNFT = (tokenId, price) => {
        setTokenDetails({ id: tokenId, price });
    };
    console.log("list NFT :", listNFT)

    return {
        listNFT,
        isLoading,
        isSuccess,
        error: prepareError || error,
        isError: isPrepareError || isError,
    };
}