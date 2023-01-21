import { Button, Flex, Image, Skeleton, Stack, Text } from "@chakra-ui/react";

export default function CartSkeleton() {
  return (
    <Skeleton
      w={["100%", "100%", "600px", "600px"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      p={"15px"}
    >
      {/* Product */}
      <Flex>
        <Image src="" w={"100px"} />
        <Flex
          //   border={"1px solid red"}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Stack ml={"17px"} color="rgb(102, 116, 142)">
            <Text>Title:</Text>
            <Text>Size</Text>
            <Text>price :</Text>
          </Stack>
          <Stack>
            <Button>Remove</Button>
          </Stack>
        </Flex>
      </Flex>
    </Skeleton>
  );
}
