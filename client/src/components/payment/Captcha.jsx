import { Box, Text } from "@chakra-ui/react";

const Captcha = ({ captcha = "" }) => (
  <Box
    bgColor="gray.100"
    px="4"
    py="2"
    mb="6"
    borderRadius="md"
    display="inline-block"
  >
    <Text fontWeight="semibold" display="inline">
      Captcha:
    </Text>
    <Text
      display="inline-block"
      userSelect="none"
      onCopy={(e) => e.preventDefault()}
      px="2"
      borderRadius="md"
      bgColor="white"
      boxShadow="md"
      cursor="pointer"
      ml={"10px"}
    >
      {captcha}
    </Text>
  </Box>
);

export default Captcha;
