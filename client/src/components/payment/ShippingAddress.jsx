import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ShippingAddress = () => {
  const { address } = useSelector((state) => state.orderReducer);
  return (
    <>
      <Heading fontSize="lg" mb={2} color="gray.600">
        Shipping Address
      </Heading>
      <Box mb={2}>
        <Heading fontSize="md" mb={1} color="gray.600">
          Contact Details
        </Heading>
        <Text fontSize="md" mb={1} color="gray.600">
          {address?.name}
        </Text>
        <Text fontSize="md" mb={1} color="gray.600">
          {address?.mobile}
        </Text>
      </Box>
    </>
  );
};

export default ShippingAddress;
