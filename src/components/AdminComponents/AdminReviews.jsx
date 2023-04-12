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

export function SingleReview({ name, email, message }) {
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
        <Text fontSize="16px">{email}</Text>
        <Divider />
        <Text fontSize="14px">{message}</Text>
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
          Resolved
        </Text>
      </Stack>
    </Flex>
  );
}

export default function AdminReviews() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const UsersData = async () => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63cd0ca00f1d5967f028fa8e.mockapi.io/Reviews`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UsersData();
  }, []);
  return (
    <Box>
      <AdminNavbar />
      <Flex p="10px" w="80%" m="auto">
        <AdminSidebar />
        <Box
          w={["100%", "100%", "60%", "60%"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="scroll"
          h="80vh"
          m="auto"
          bgColor="#f2f2f2"
          pb="10px"
        >
          <Heading fontSize={"xl"} textAlign={"center"} mt={"5px"} mb={"10px"}>
            Customers Feedback and Reviews
          </Heading>

          {data.map((item) => (
            <SingleReview key={item.id} {...item} />
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
