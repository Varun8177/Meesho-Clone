import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function CartItem({
  title,
  images,
  price,
  id,
  HandleTotal,
  deleteCartItem,
  size,
}) {
  const [qty, setQuantity] = useState(1);
  const userId = localStorage.getItem("id");
  const handleQuantity = (val) => {
    if (val === 1) {
      setQuantity(qty + val);
      const priceWithoutCurrencySymbol = price.trim().substring(1);
      const priceValue = Number(priceWithoutCurrencySymbol);
      HandleTotal(priceValue, 1);
    } else {
      setQuantity(qty + val);
      const priceWithoutCurrencySymbol = price.trim().substring(1);
      const priceValue = Number(priceWithoutCurrencySymbol);
      HandleTotal(priceValue, -1);
    }
  };
  return (
    <Box
      // w={["100%", "100%", "750px", "750px"]}
      w={{ base: "100%", xl: "600px", "2xl": "750px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      p={"15px"}
    >
      <Flex alignItems="center">
        <Image src={images} w={"100px"} borderRadius="md" mr="4" />
        <Stack color="gray.500">
          <Text fontWeight="bold" fontSize="lg">
            {title}
          </Text>
          <Text fontSize="md">Size: {size}</Text>
          <Text fontSize="md">Price: {price}</Text>
          <Flex alignItems="center">
            <Button
              isDisabled={qty === 1}
              size="sm"
              onClick={() => handleQuantity(-1)}
              variant="outline"
            >
              -
            </Button>
            <Text fontSize="lg" mx="2">
              {qty}
            </Text>
            <Button
              size="sm"
              onClick={() => handleQuantity(1)}
              variant="outline"
              isDisabled={qty === 7}
            >
              +
            </Button>
          </Flex>
        </Stack>
        <Button
          onClick={() => {
            deleteCartItem(userId, id, qty, price);
          }}
          size="sm"
          variant="outline"
          ml="auto"
        >
          X
        </Button>
      </Flex>
    </Box>
  );
}
