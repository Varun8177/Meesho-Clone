import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function Total({ total }) {
  return (
    <Box
      w={["100%", "100%", "300px", "300px"]}
      borderWidth="1px"
      overflow="hidden"
      mt={"20px"}
      pb={"5"}
      borderLeft={"2px solid rgb(234, 239, 244)"}
    >
      <Box>
        <Box p="26px">
          <Heading fontSize={"xl"} color="rgb(102, 116, 142)">
            Price Details
          </Heading>
        </Box>
        <Stack pl={"26px"} color="rgb(102, 116, 142)" pr={"20px"}>
          <Text>Total Product Price:{total} INR</Text>
          <hr />

          <Heading fontSize={"xl"}>Order Total :{total} INR </Heading>
          <Button
            borderRadius={"5px"}
            width={"100%"}
            bgColor={"rgb(244, 51, 151)"}
            color={"white"}
          >
            <Box as="span" marginRight={"10px"}>
              <ArrowForwardIcon />
            </Box>
            Checkout
          </Button>
          <Image src="https://images.meesho.com/images/marketing/1588578650850.webp" />
        </Stack>
      </Box>
    </Box>
  );
}
