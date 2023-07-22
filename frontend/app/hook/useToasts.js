import { useToast } from "@chakra-ui/react";

const useToasts = () => {
  const toast = useToast();

  const showErrorToast = (description) => {
    toast({
      title: "Error.",
      description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const showSuccessToast = (description) => {
    toast({
      title: "Success.",
      description,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return { showErrorToast, showSuccessToast };
};

export default useToasts;