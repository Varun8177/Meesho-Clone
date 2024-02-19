import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const ProductHeader = ({ title, subTitle }) => {
  return (
    <Stack>
      <Stack spacing={8} direction="row">
        <Box p={5}>
          <Heading fontSize="xl">Products for you</Heading>
          <Text mt={4}>
            Showing {1}-{1 + 9} out of 10000 products
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProductHeader;
