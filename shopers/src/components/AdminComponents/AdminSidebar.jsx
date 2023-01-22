import {
  Box,
  Button,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <Box alignItems={"center"} h={"600px"} w={"35%"} borderWidth="1px">
      <TableContainer w={"90%"} m={"auto"} position={"sticky"} top={"10"}>
        <Table variant="simple">
          <Thead>
            <Heading mb={"50px"}>Admin Dashboard</Heading>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                onClick={() => {
                  navigate("/profile/Admin");
                }}
                cursor={"pointer"}
              >
                Profile
              </Td>
            </Tr>
            <Tr>
              <Td
                cursor={"pointer"}
                onClick={() => {
                  navigate("/profile/Admin/add-product");
                }}
              >
                Add Product
              </Td>
            </Tr>
            <Tr>
              <Td
                cursor={"pointer"}
                onClick={() => {
                  navigate("/profile/Admin/mens");
                }}
              >
                Mens
              </Td>
            </Tr>
            <Tr>
              <Td
                cursor={"pointer"}
                onClick={() => {
                  navigate("/profile/Admin/kids");
                }}
              >
                Kids
              </Td>
            </Tr>
            <Tr>
              <Td
                cursor={"pointer"}
                onClick={() => {
                  navigate("/profile/Admin/women");
                }}
              >
                Women
              </Td>
            </Tr>

            <Tr>
              <Td
                cursor={"pointer"}
                onClick={() => {
                  navigate("/profile/Admin/users-joined");
                }}
              >
                Users Joined
              </Td>
            </Tr>
            <Tr>
              <Td
                onClick={() => {
                  navigate("/profile/Admin/reviews");
                }}
                cursor={"pointer"}
              >
                Reviews & feedback
              </Td>
            </Tr>
            <Tr>
              <Td
                cursor={"pointer"}
                onClick={() => {
                  navigate("/profile/Admin/create-admin");
                }}
              >
                Create Admin
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Button
          w={"100%"}
          m={"auto"}
          bgColor={"pink.400"}
          _hover={{
            bg: "pink.500",
          }}
          cursor={"pointer"}
          color={"white"}
          onClick={() => {
            localStorage.setItem("login", false);
            navigate("/");
          }}
        >
          Logout
        </Button>
      </TableContainer>
    </Box>
  );
}

// sidebar
