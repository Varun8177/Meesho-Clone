import { Badge, Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import handleScrollTop from "../utils/handleScrollTop";

const ProductCard = ({
  id = 0,
  title = "",
  price = 0,
  rating = 0,
  reviews = 0,
  image = "",
}) => {
  const navigate = useNavigate();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      border="1px solid rgb(223, 223, 223)"
      cursor="pointer"
      width="230px"
      onClick={() => {
        handleScrollTop();
        navigate(`/product/${id}`);
      }}
      h="fit-content"
    >
      <Image
        src={image}
        alt={`product-image-${id}`}
        h={{ base: "150px", md: "232px" }}
        margin="auto"
        w="full"
        objectFit="cover"
      />

      <Box p={{ base: "2", md: "6" }}>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>

        <Box fontSize={{ base: "sm", md: "xl" }}>
          {price}
          <Box as="span" color="gray.600" fontSize="sm">
            /onwards
          </Box>
        </Box>

        <Badge
          borderRadius="full"
          px="2"
          colorScheme="gray"
          mt="10px"
          h="20px"
          alignItems="center"
        >
          Free Delivery
        </Badge>

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
            rating >= 4
              ? "rgb(3, 141, 99)"
              : rating > 2
              ? "rgb(244, 182, 25)"
              : "red"
          }
        >
          {rating} <FaStar color={"white"} />
        </Flex>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviews} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
