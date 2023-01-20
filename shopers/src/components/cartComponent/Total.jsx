import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

export default function Total({ totalprice }) {
  return (
    <Box
      w={["100%", "100%", "300px", "300px"]}
      borderWidth="1px"
      overflow="hidden"
      mt={"20px"}
      pb={"5"}
      borderLeft={"2px solid black"}
    >
      <Box>
        <Box p="26px">
          <Heading fontSize={"xl"} color="rgb(102, 116, 142)">
            Price Details
          </Heading>
        </Box>
        <Stack pl={"26px"} color="rgb(102, 116, 142)" pr={"20px"}>
          <Text>Total Product Price:{totalprice}</Text>
          <hr />

          <Heading fontSize={"xl"}>Order Total :{totalprice} </Heading>
        </Stack>
      </Box>
    </Box>
  );
}
