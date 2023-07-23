import { useState } from "react";
import { NFTStorage, File } from 'nft.storage'

const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY });

const useNFTStorage = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToNFTStorage = async ({ name, description, image }) => {
    setIsUploading(true);
    try {
      const file = new File([image], "nft-image", { type: image.type });
      const metadata = await client.store({
        name,
        description,
        image: file,
      });
      return metadata;
    } catch (error) {
      console.error("Failed to upload to NFT.Storage:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };


  return { uploadToNFTStorage, isUploading };
};

export default useNFTStorage;