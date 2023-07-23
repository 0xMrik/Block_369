import { useEffect, useState } from 'react';
import axios from 'axios';

const useNFTData = (nfts) => {
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!nfts || nfts.length === 0) return;
      
      let data = await Promise.all(nfts.map(async (nft) => {
        const ipfsCID = nft.tokenURI.split('//')[1];
        const metadataUrl = `https://ipfs.io/ipfs/${ipfsCID}`;
        let response = await axios.get(metadataUrl);
        return { ...response.data, id: nft.id, price: nft.price };
      }));

      setNftData(data);
    };
    fetchData();
  }, [nfts]);

  return nftData;
};

export default useNFTData;