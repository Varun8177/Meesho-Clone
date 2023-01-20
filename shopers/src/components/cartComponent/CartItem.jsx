import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { EditButton } from "../../pages/Cart";

export default function CartItem({ title, images, price }) {
  return (
    <Box
      w={["100%", "100%", "600px", "600px"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      p={"15px"}
    >
      {/* Product */}
      <Flex>
        <Image src={images} w={"100px"} />
        <Flex
          //   border={"1px solid red"}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Stack ml={"17px"} color="rgb(102, 116, 142)">
            <Text>Title:{title}</Text>
            <Text>Size</Text>
            <Text>price :{price}</Text>
          </Stack>
          <Stack>
            <EditButton />
            <Button>Remove</Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
