import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const PriceDetails = () => {
  const { total } = useSelector((state) => state.orderReducer);
  return (
    <Box bgColor="gray.100" p="6" borderRadius="md" border="1px solid gray.200">
      <Heading fontSize="md" mb="4" fontWeight="semibold">
        Price Details
      </Heading>
      <Flex justifyContent="space-between" alignItems="center">
        <Text>Total Product Price:</Text>
        <Text>{total} INR</Text>
      </Flex>
      <hr />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading fontSize="md">Order Total:</Heading>
        <Heading fontSize="md">{total} INR</Heading>
      </Flex>
    </Box>
  );
};

export default PriceDetails;
