import { Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const SubmitButton = ({ isLoading }) => {

  return (
    <Button leftIcon={<CheckIcon />} colorScheme="teal" variant="solid" type="submit" isLoading={isLoading}>
      Create
    </Button>
  );
};

export default SubmitButton;