import { useToast } from "@chakra-ui/react";

const UseResponseHandler = () => {
  const toast = useToast();
  const handleResponse = (title, description, status = false, options) => {
    toast.closeAll();
    return toast({
      title,
      description,
      status: status ? "success" : "error",
      position: "top-left",
      ...options,
    });
  };
  return { handleResponse };
};

export default UseResponseHandler;
