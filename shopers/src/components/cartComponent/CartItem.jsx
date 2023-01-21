import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";

export default function CartItem({
  title,
  images,
  price,
  id,
  HandleTotal,
  deleteCartItem,
}) {
  const [qty, setQuantity] = useState(1);
  const [value, setvalue] = useState(1);
  useEffect(() => {
    let k = price.trim().split("");
    k.shift();
    k = k.join("");
    k = Number(k);
    HandleTotal(k, value);
  }, [qty]);
  const userId = localStorage.getItem("id");
  const handleQuantity = (val) => {
    if (val === 1) {
      setQuantity(qty + val);
      setvalue(1);
    } else {
      setQuantity(qty + val);
      setvalue(-1);
    }
  };
  return (
    <Box
      w={["100%", "100%", "750px", "750px"]}
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
            <Flex>
              <Button isDisabled={qty === 1} onClick={() => handleQuantity(-1)}>
                -
              </Button>
              <Button isDisabled>{qty}</Button>
              <Button onClick={() => handleQuantity(1)}>+</Button>
            </Flex>
          </Stack>
          <Stack>
            <Button
              onClick={() => {
                deleteCartItem(userId, id);
              }}
            >
              X
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
