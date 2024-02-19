import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import CartItem from "../components/cart/CartItem";
import Total from "../components/cart/Total";
import { useSelector } from "react-redux";

const Cart = () => {
  const { products, loading } = useSelector((store) => store.cartReducer);

  return (
    <Box w={"70%"} m={"auto"}>
      <Heading>Cart</Heading>
      <Text>{products?.length || 0} items in your cart</Text>
      <Flex
        justifyContent="space-between"
        m="auto"
        direction={{ base: "column", lg: "row" }}
      >
        <Stack>
          {loading
            ? "loading"
            : products?.map((item) => {
                return <CartItem {...item} key={item._id} />;
              })}
        </Stack>
        <Total />
      </Flex>
    </Box>
  );
};

export default Cart;
