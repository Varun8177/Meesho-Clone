import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <Box
      h="100%"
      w="35%"
      p="2"
      position="sticky"
      top="10"
      bgColor="white"
      border="1px solid #E5E7EB"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center" fontWeight="bold">
              Dashboard
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin")}
          >
            <Td>Profile</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/add-product")}
          >
            <Td>Add Product</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/mens")}
          >
            <Td>Mens</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/kids")}
          >
            <Td>Kids</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/women")}
          >
            <Td>Women</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/users-joined")}
          >
            <Td>Users Joined</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/reviews")}
          >
            <Td>Reviews &amp; Feedback</Td>
          </Tr>
          <Tr
            cursor="pointer"
            _hover={{ bgColor: "#F3F4F6" }}
            onClick={() => navigate("/profile/Admin/create-admin")}
          >
            <Td>Create Admin</Td>
          </Tr>
        </Tbody>
      </Table>
      <Button
        w="100%"
        mt="2"
        bgColor="pink.400"
        _hover={{ bg: "pink.500" }}
        color="white"
        onClick={() => {
          localStorage.setItem("login", false);
          navigate("/");
        }}
      >
        Logout
      </Button>
    </Box>
  );
}

// sidebar
