import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";

const ProductsLoadingScreen = () => {
  return (
    <Skeleton>
      <Box
        height="400px"
        width="230px"
        borderWidth="1px"
        borderRadius="lg"
        border="1px solid rgb(223, 223, 223)"
        cursor="pointer"
        p={{ base: "2", md: "6" }}
        boxSizing="border-box"
      />
    </Skeleton>
  );
};

export default ProductsLoadingScreen;
