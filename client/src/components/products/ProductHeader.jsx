import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const ProductHeader = ({ title, subTitle }) => {
  return (
    <Box>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{subTitle}</Text>
    </Box>
  );
};

export default ProductHeader;
