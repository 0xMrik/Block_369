import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useEffect, useState } from 'react';
import contractABI from '../../../backend/artifacts/contracts/NFTMarketplace.sol/NFTMarket.json';
import { parseUnits } from 'viem';

export default function useListNFT() {
    const [tokenDetails, setTokenDetails] = useState(null);
    const [shouldListNFT, setShouldListNFT] = useState(false); 

    const args = tokenDetails ? [tokenDetails.id, parseUnits(tokenDetails.price.toString(), 'ether')] : [];
    const enabled = shouldListNFT;

    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: '0xD9FE224B595F619259d7991ba1e5E16965540e67',
        abi: contractABI.abi,
        functionName: 'listNFT',
        args,
        enabled,
    });

    console.log('config:', config, 'prepareError:', prepareError, 'isPrepareError:', isPrepareError); // log values

    const { data, error, isError, write } = useContractWrite(config);
    console.log('transaction data:', data); 
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

    const listNFT = (tokenId, price) => {
        setTokenDetails({ id: tokenId, price });
        setShouldListNFT(true);
        write();
        console.log("write() called"); 
    };

    useEffect(() => {
        if (isSuccess || isError) {
            setShouldListNFT(false);
        }
    }, [isSuccess, isError]);

    return {
        listNFT,
        isLoading,
        isSuccess,
        error: prepareError || error,
        isError: isPrepareError || isError,
    };
}