import { Box, Text } from "@chakra-ui/react";

const MoreProductsOverlay = () => {
  return (
    <Box
      zIndex={5}
      top={0}
      bottom={0}
      right={0}
      left={0}
      position="absolute"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="100px"
        height="100px"
        opacity={0.3}
        backgroundColor={"grey"}
        position="relative"
      ></Box>
      <Text position="absolute" color="white" fontWeight="bold">
        More
      </Text>
    </Box>
  );
};

export default MoreProductsOverlay;
