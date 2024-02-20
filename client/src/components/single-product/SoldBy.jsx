import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdEmail } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";

const SoldBy = () => {
  return (
    <Box
      border={"1px solid rgb(223, 223, 223)"}
      w={{ base: "100%", md: "400px", lg: "500px", xl: "500px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      pb={"5"}
      ml={{ md: "10px" }}
    >
      <Box p="6">
        <Heading fontSize={"xl"}>Sold by</Heading>
      </Box>
      <Stack mx={"17px"} color="rgb(102, 116, 142)">
        <Flex alignItems={"center"}>
          <IconButton
            mr={"20px"}
            variant="outline"
            colorScheme="rgb(244, 51, 151)"
            aria-label="Send email"
            icon={<MdEmail />}
          />
          <Text>Harekrishnafashion@gmail.com</Text>
        </Flex>
        <Button
          textAlign={"center"}
          rightIcon={<IoIosArrowRoundForward size={30} />}
          bgColor="rgb(244, 51, 151)"
          variant="outline"
          color={"white"}
          _hover={{ bg: "rgb(199, 60, 157)" }}
        >
          View Shop
        </Button>
      </Stack>
    </Box>
  );
};

export default SoldBy;
