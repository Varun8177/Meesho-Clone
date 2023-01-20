import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import CartItem from "../components/cartComponent/CartItem";
import Total from "../components/cartComponent/Total";

export function EditButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="pink" onClick={onOpen}>
        Edit
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>EDIT ITEM</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="pink">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function Cart() {
  const [data, setData] = useState([]);
  const [totalprice, setTotal] = useState(0);
  const id = localStorage.getItem("id");
  function getReq(id) {
    axios
      .get(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart`
      )
      .then((res) => {
        setData(res.data);
        data.map((item) => {
          const price = item.price.split(" ");
          return setTotal(totalprice + price[1]);
        });
      });
  }
  useEffect(() => {
    getReq(id);
  }, [id]);
  // console.log(data);
  return (
    <Box w={"70%"} mt={["50px", "150px", 0, 0, 0]} m={"auto"}>
      <Heading>Cart</Heading>
      <Flex
        mt={["50px", "50px", 0, 0, 0]}
        justifyContent={"space-between"}
        m={"auto"}
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
      >
        <Stack>
          {data.map((item) => {
            return <CartItem {...item} />;
          })}
        </Stack>
        {/* <CartItem /> */}

        {/* Total */}

        <Total total={totalprice} />
      </Flex>
    </Box>
  );
}
