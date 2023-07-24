import { useQuery } from "@apollo/client";
import { useAccount } from 'wagmi';
import { GET_LISTED_NFTS } from '../../graphql/queries';

const useListedNFTs = () => {
    const { address } = useAccount();
    const { loading, error, data } = useQuery(
        GET_LISTED_NFTS,
        { 
            variables: { 
                currentAddress: address ?? "" 
            }, 
            skip: !address || address === "" 
        }
    );

    if (loading) return { loading };
    if (error) return { error };

    const ListedNFTs = data?.nfts ? data.nfts : [];
    console.log("HOOK :", ListedNFTs)
    return { ListedNFTs };
    
};

export default useListedNFTs;