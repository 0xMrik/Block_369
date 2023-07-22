import { useState } from "react";
import { FormControl, FormLabel, Input, Image } from "@chakra-ui/react";

const ImageUpload = ({ onImageUpload }) => {
    const [preview, setPreview] = useState("");

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      onImageUpload(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setPreview(reader.result);
      };
    };
  
    return (
      <FormControl id="image-upload">
        <FormLabel fontSize="xl">Upload Image:</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {preview && <Image boxSize="200px" src={preview} alt="preview" />}
      </FormControl>
    );
  };

export default ImageUpload;