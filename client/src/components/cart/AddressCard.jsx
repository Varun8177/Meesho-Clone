import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const AddressCard = ({
  _id,
  name,
  house_no,
  area,
  city,
  pincode,
  country,
  nearby_location,
  mobile,
  isSelected,
  handleSelect = () => {},
  OrderVersion = false,
  default: defaultValue,
}) => {
  return (
    <Box
      borderWidth={OrderVersion ? "0" : "1px"}
      borderRadius="lg"
      p={OrderVersion ? 0 : 4}
      boxShadow={OrderVersion ? "none" : "md"}
      bg="white"
      maxW="400px"
      w="100%"
      my="10px"
      cursor="pointer"
      border={isSelected && "1px solid blue"}
      onClick={() => handleSelect(_id)}
    >
      {defaultValue && !OrderVersion && (
        <Badge variant="subtle" colorScheme="green" mr={"5px"}>
          default
        </Badge>
      )}
      <Text fontWeight="bold" fontSize="lg" mb="2">
        {OrderVersion && (
          <Badge variant="subtle" colorScheme="green" mr={"5px"}>
            delevered to
          </Badge>
        )}
        {name}
      </Text>
      <Text fontSize="sm" color="gray.500" mb="2">
        {house_no}, {area}, {city}, {pincode}
      </Text>
      <Text fontSize="sm" color="gray.500" mb="2">
        Country: {country}
      </Text>
      {nearby_location && (
        <Text fontSize="sm" color="gray.500" mb="2">
          Nearby Location: {nearby_location}
        </Text>
      )}
      <Flex alignItems="center">
        <Text fontSize="sm" fontWeight="bold" mr="2">
          Mobile:
        </Text>
        <Text fontSize="sm">{mobile}</Text>
      </Flex>
    </Box>
  );
};

export default AddressCard;
