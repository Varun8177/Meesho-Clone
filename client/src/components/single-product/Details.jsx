import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const Details = () => {
  const { singleProduct } = useSelector((state) => state.productReducer);
  return (
    <Box
      border={"1px solid rgb(223, 223, 223)"}
      w={{ base: "100%", md: "400px", lg: "500px", xl: "500px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      ml={{ md: "10px" }}
      pb={"5"}
    >
      <Box p="6">
        <Heading fontSize={"xl"}>Product Details</Heading>
      </Box>
      <Stack ml={"17px"} color="rgb(102, 116, 142)">
        <Text>Name: {singleProduct?.title}</Text>
        <Text>price: ₹{singleProduct?.price}</Text>
        <Text>fabric: cotton</Text>
        <Text>Sizes: Xl,L,S</Text>
        <Text>Country of Origin : India</Text>
      </Stack>
    </Box>
  );
};

export default Details;
