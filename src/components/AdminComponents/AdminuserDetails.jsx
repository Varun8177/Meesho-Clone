import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Skeleton,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { CloseIcon } from "@chakra-ui/icons";

export function SingleUserData({
  name,
  mobile,
  cartItems,
  DeleteUsersData,
  id,
}) {
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
          onClick={() => DeleteUsersData(id)}
          aria-label="Close review"
          icon={<CloseIcon color="gray.600" />}
          alignSelf="flex-end"
          size="sm"
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

export function UsersSkeleton() {
  return (
    <Skeleton
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
          name
        </Text>
        <Text fontSize="16px">Mobile: </Text>
        <Divider />
        <Text fontSize="14px">Items in cart: </Text>
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
    </Skeleton>
  );
}

export default function AdminuserDetails() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const toast = useToast();
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const UsersData = async () => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users?sortBy=id&order=desc`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUsersData = async (id) => {
    setLoad(true);
    try {
      const dress = await axios.delete(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}`
      );
      if (dress) {
        UsersData();
        toast({
          title: "User Deleted Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UsersData();
  }, []);
  return (
    <Box bgColor={"#fafafa"}>
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
          bgColor="white"
          mt={"0"}
          pb={"10"}
        >
          <Table
            variant="simple"
            pos={"sticky"}
            top={"0"}
            bgcolor="white"
            zIndex={"3"}
          >
            <Thead>
              <Tr>
                <Th textAlign="center" fontWeight="bold">
                  Data of recently joined users
                </Th>
              </Tr>
            </Thead>
          </Table>
          {/* <Heading fontSize={"lg"} textAlign={"center"} mt={"5px"}>
            Data of recently joined users
          </Heading> */}
          {load
            ? arr.map((items) => {
                return <UsersSkeleton {...items} />;
              })
            : data.map((item) => {
                return (
                  <SingleUserData {...item} DeleteUsersData={DeleteUsersData} />
                );
              })}
        </Box>
      </Flex>
    </Box>
  );
}
