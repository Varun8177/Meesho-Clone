import { Box, Text } from "@chakra-ui/react";

const PaymentMethod = () => (
  <Box
    bgColor="gray.100"
    px="4"
    py="2"
    mb="6"
    borderRadius="md"
    display="inline-block"
  >
    <Text fontWeight="semibold" display="inline">
      Cash on Delivery
    </Text>
  </Box>
);
export default PaymentMethod;
