import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import UseResponseHandler from "../utils/UseResponseHandler";
import {
  deleteCartData,
  updateCartData,
} from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const CartItem = ({ productId, quantity, product }) => {
  const { handleResponse } = UseResponseHandler();
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const handleLoading = (val) => {
    setLoading(val);
  };

  const handleUpdate = (task) => {
    setLoading(task);
    updateCartData(dispatch, task, productId, handleResponse, handleLoading);
  };
  return (
    <Box
      w={{ base: "100%", xl: "600px", "2xl": "750px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      p={"15px"}
    >
      <Flex alignItems="center">
        <Image src={product?.image} w={"100px"} borderRadius="md" mr="4" />
        <Stack color="gray.500">
          <Text fontWeight="bold" fontSize="lg">
            {product?.title}
          </Text>
          <Text fontSize="md">Size: xl</Text>
          <Text fontSize="md">Price: {product.price}</Text>
          <Flex alignItems="center">
            <Button
              isDisabled={quantity === 1}
              size="sm"
              onClick={() => handleUpdate("reduce")}
              variant="outline"
              isLoading={loading === "reduce"}
            >
              -
            </Button>
            <Text fontSize="lg" mx="2">
              {quantity || 0}
            </Text>
            <Button
              size="sm"
              onClick={() => handleUpdate("add")}
              isLoading={loading === "add"}
              variant="outline"
              isDisabled={0 === 7}
            >
              +
            </Button>
          </Flex>
        </Stack>
        <Button
          onClick={() => {
            handleLoading("delete");
            deleteCartData(dispatch, productId, handleResponse, handleLoading);
          }}
          isLoading={loading === "delete"}
          size="sm"
          variant="outline"
          ml="auto"
        >
          X
        </Button>
      </Flex>
    </Box>
  );
};

export default CartItem;
