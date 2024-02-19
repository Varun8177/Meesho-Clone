import { Badge, Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Description = () => {
  const { singleProduct } = useSelector((state) => state.productReducer);
  return (
    <Box
      border={"1px solid rgb(223, 223, 223)"}
      w={{ base: "100%", md: "400px", lg: "500px" }}
      ml={{ md: "10px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box p="6">
        <Heading fontSize={"xl"} color={"rgb(153, 153, 153)"}>
          {singleProduct?.title}
        </Heading>

        <Box fontSize="4xl">
          ₹{singleProduct?.price}
          <Box as="span" color="gray.600" fontSize="sm">
            /{"onwards"}
          </Box>
        </Box>
        <Flex
          w="fit-content"
          gap="2"
          mt="10px"
          alignItems="center"
          borderRadius="full"
          px="2"
          fontSize="md"
          color="white"
          bgColor={
            0 >= 4 ? "rgb(3, 141, 99)" : 3 > 2 ? "rgb(244, 182, 25)" : "red"
          }
        >
          {singleProduct?.rating} <FaStar color={"white"} />
        </Flex>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {singleProduct?.reviews} reviews
          </Box>
        </Box>
        <Badge
          borderRadius="full"
          px="2"
          colorScheme="gray"
          mt={"10px"}
          h={"20px"}
          alignItems={"center"}
        >
          Free Delivery
        </Badge>
      </Box>
    </Box>
  );
};

export default Description;
