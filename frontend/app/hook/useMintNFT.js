import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import contractABI from '../../../backend/artifacts/contracts/NFTMarketplace.sol/NFTMarket.json'

export default function useMintNFT() {
    const [tokenURI, setTokenURI] = useState(null);
    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
        address: '0xD9FE224B595F619259d7991ba1e5E16965540e67',
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