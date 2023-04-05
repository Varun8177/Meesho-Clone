import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export function SingleUserData({ name, mobile, cartItems, id }) {
  return (
    <Flex
      justifyContent={"space-between"}
      w={["100%", "100%", "60%", "60%"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={"15px"}
      m={"auto"}
      mt={"30px"}
      bgColor={"pink.200"}
    >
      <Stack ml={"17px"}>
        <Text>Name: {name}</Text>
        <Text>Mobile Number :{mobile}</Text>
        <Text>cart Items: {cartItems.length}</Text>
        <Text>Id:{id}</Text>
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
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users?sortBy=id&order=desc&page=${val}&limit=3&`
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
          m={"auto"}
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
      <Box textAlign={"center"} mt={"20px"}>
        <Button isDisabled={page === 1} onClick={() => handleClick(-1, -10)}>
          Previous
        </Button>
        <Button isDisabled>{page}</Button>
        <Button
          isDisabled={data.length !== 3}
          onClick={() => handleClick(1, 10)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
