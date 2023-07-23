import { useQuery } from "@apollo/client";
import { useAccount } from 'wagmi';
import { GET_OWNED_NFTS } from '../graphql/queries';

const useOwnedNFTs = () => {
    const { address } = useAccount();
    const { loading, error, data } = useQuery(
        GET_OWNED_NFTS,
        { variables: { owner: address ?? "" }, skip: !address || address === "" }
    );

    if (loading) return { loading };
    if (error) return { error };


    const ownedNFTs = data?.nfts ? data.nfts : [];
    return { ownedNFTs };
    
};

export default useOwnedNFTs;