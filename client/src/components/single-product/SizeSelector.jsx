import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const SizeSelector = () => {
  const sizes = ["Xl", "S", "L"];

  const handleSizeSelection = (size) => {
    // localStorage.setItem("size", size);
  };

  return (
    <Box
      border="1px solid rgb(223, 223, 223)"
      w={{ base: "100%", md: "400px", lg: "500px", xl: "500px" }}
      borderWidth="1px"
      borderRadius="lg"
      ml={{ md: "10px" }}
      overflow="hidden"
      mt="20px"
      pb="5"
    >
      <Box p="6">
        <Heading fontSize="xl">Select Size</Heading>
      </Box>
      <Flex justifyContent="space-evenly" width="150px" ml="17px">
        {sizes.map((size) => (
          <Button
            key={size}
            _focus={{
              ring: "1px",
              ringColor: "black",
            }}
            borderRadius="50%"
            border="1px solid rgb(223, 223, 223)"
            onClick={() => handleSizeSelection(size)}
          >
            {size}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default SizeSelector;
