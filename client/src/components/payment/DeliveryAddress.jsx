import { Box, Heading, Text } from "@chakra-ui/react";
import SelectAddress from "../cart/SelectAddress";
import { useSelector } from "react-redux";

const DeliveryAddress = () => {
  const { address } = useSelector((state) => state.orderReducer);

  return (
    <Box>
      <Heading fontSize="md" mb={1} color="gray.600">
        Delivery Address
      </Heading>
      <Text fontSize="md" mb={1} color="gray.600">
        {address?.area}
      </Text>
      <Text fontSize="md" mb={1} color="gray.600">
        {address?.house_no}
      </Text>
      <Text fontSize="md" mb={1} color="gray.600">
        {address?.city}, {address?.pincode}
      </Text>
      <Text fontSize="md" mb={1} color="gray.600">
        India
      </Text>
      <SelectAddress edit={true} />
    </Box>
  );
};

export default DeliveryAddress;
