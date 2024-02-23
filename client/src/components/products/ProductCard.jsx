import { AspectRatio, Badge, Box, Flex, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import handleScrollTop from "../utils/handleScrollTop";
import OptionBox from "./OptionBox";
import { useSelector } from "react-redux";

const ProductCard = ({
  id = 0,
  title = "",
  price = 0,
  rating = 0,
  reviews = 0,
  image = "",
  tag,
  showOptions = true,
}) => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      border="1px solid rgb(223, 223, 223)"
      cursor="pointer"
      width="230px"
      h="fit-content"
      pos="relative"
    >
      {showOptions && user && user?.role === "admin" && (
        <Stack pos="absolute" right={0} top={0} zIndex={5}>
          <OptionBox
            id={id}
            image={image}
            price={price}
            title={title}
            tag={tag}
          />
        </Stack>
      )}
      <Box
        onClick={() => {
          handleScrollTop();
          navigate(`/product/${id}`);
        }}
      >
        <AspectRatio maxW="300px" h="300px" ratio={4 / 3}>
          <Image src={image} alt={`product-image-${id}`} objectFit="contain" />
        </AspectRatio>

        <Box p={2}>
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
    </Box>
  );
};

export default ProductCard;
