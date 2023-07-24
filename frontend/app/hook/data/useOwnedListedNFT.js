import { useQuery } from "@apollo/client";
import { useAccount } from 'wagmi';
import { GET_OWNED_LISTED_NFTS } from '../../graphql/queries';

const useOwnedListedNFTs = () => {
    const { address } = useAccount();
    const { loading, error, data } = useQuery(
        GET_OWNED_LISTED_NFTS,
        { variables: { owner: address ?? "" }, skip: !address || address === "" }
    );

    if (loading) return { loading };
    if (error) return { error };


    const OwnedListedNFTs = data?.nfts ? data.nfts : [];
    return { OwnedListedNFTs };
    
};

export default useOwnedListedNFTs;