import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Soldby() {
  return (
    <Box
      border={"1px solid rgb(223, 223, 223)"}
      w={["100%", "100%", "500px", "500px"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      pb={"5"}
    >
      <Box p="6">
        <Heading fontSize={"xl"}>Sold by</Heading>
      </Box>
      <Stack ml={"17px"} color="rgb(102, 116, 142)">
        <Flex alignItems={"center"}>
          <IconButton
            mr={"20px"}
            variant="outline"
            colorScheme="rgb(244, 51, 151)"
            aria-label="Send email"
            icon={<EmailIcon />}
          />
          <Text>Harekrishnafashion@gmail.com</Text>
        </Flex>
        <Button
          textAlign={"center"}
          rightIcon={<ArrowForwardIcon />}
          bgColor="rgb(244, 51, 151)"
          variant="outline"
          color={"white"}
          width={"80%"}
          margin={"auto"}
        >
          View Shop
        </Button>
      </Stack>
    </Box>
  );
}
