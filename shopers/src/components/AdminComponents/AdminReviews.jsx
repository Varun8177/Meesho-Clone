import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export function SingleReview({ name, email, message }) {
  return (
    <Flex
      bgColor={"pink.200"}
      justifyContent={"space-between"}
      w={["100%", "100%", "60%", "60%"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={"15px"}
      m={"auto"}
      mt={"30px"}
    >
      <Stack ml={"17px"}>
        <Text>Name: {name}</Text>
        <Text>email :{email}</Text>
        <Text>review: {message}</Text>
      </Stack>
    </Flex>
  );
}

export default function AdminReviews() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setpage] = useState(1);
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const UsersData = async (val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63cd0ca00f1d5967f028fa8e.mockapi.io/Reviews?sortBy=id&order=desc&page=${val}&limit=3&`
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
            Recent Reviews
          </Heading>
          {data.map((item) => {
            return <SingleReview {...item} />;
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
