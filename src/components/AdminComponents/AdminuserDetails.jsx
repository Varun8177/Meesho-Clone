import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { CloseIcon } from "@chakra-ui/icons";

export function SingleUserData({ name, mobile, cartItems, id }) {
  return (
    <Flex
      bgColor="pink.200"
      justifyContent="space-between"
      w={["100%", "100%", "60%", "60%"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="15px"
      m="auto"
      mt="30px"
      boxShadow="md"
    >
      <Stack spacing="5px">
        <Text fontSize="18px" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="16px">Mobile: {mobile}</Text>
        <Divider />
        <Text fontSize="14px">Items in cart: {cartItems.length}</Text>
      </Stack>
      <Stack alignItems="flex-end" spacing={10}>
        <IconButton
          aria-label="Close review"
          icon={<CloseIcon color="gray.600" />}
          alignSelf="flex-end"
          size="sm"
          // variant="ghost"
          _hover={{ bg: "none" }}
        />
        <Text
          fontSize="14px"
          fontWeight="medium"
          color="gray.600"
          cursor={"pointer"}
          textTransform="uppercase"
        >
          View Details
        </Text>
      </Stack>
    </Flex>
  );
}

export default function AdminuserDetails() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setpage] = useState(1);
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const UsersData = async (val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (val) => {
    setpage(page + val);
    window.scroll({
      top: 0,
      left: 0,
    });
  };
  useEffect(() => {
    UsersData(page);
  }, [page]);
  return (
    <Box>
      <AdminNavbar />
      <Flex p={"10px"} w={"80%"} m={"auto"}>
        <AdminSidebar />
        <Box
          w={["100%", "100%", "60%", "60%"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="scroll"
          h="80vh"
          m="auto"
          bgColor="#f2f2f2"
          mt={"0"}
          pb={"10"}
        >
          <Heading fontSize={"lg"} textAlign={"center"} mt={"5px"}>
            Data of recently joined users
          </Heading>
          {data.map((item) => {
            return <SingleUserData {...item} />;
          })}
        </Box>
      </Flex>
    </Box>
  );
}
