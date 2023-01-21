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

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <Box alignItems={"center"} h={"600px"}>
      <Stack direction={["column", "row"]} spacing={6}></Stack>
      <TableContainer w={"90%"} m={"auto"}>
        <Table variant="simple">
          <Thead>
            <Heading mb={"50px"}>User Dashboard</Heading>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                onClick={() => {
                  navigate("/profile");
                }}
                cursor={"pointer"}
              >
                Profile
              </Td>
            </Tr>
            <Tr>
              <Td cursor={"pointer"}>Orders</Td>
            </Tr>
            <Tr>
              <Td cursor={"pointer"}>Terms & Conditions</Td>
            </Tr>
            <Tr>
              <Td cursor={"pointer"}>Privacy Policy</Td>
            </Tr>
            <Tr>
              <Td cursor={"pointer"}>Help Center</Td>
            </Tr>
            <Tr>
              <Td
                onClick={() => {
                  navigate("/profile/review");
                }}
                cursor={"pointer"}
              >
                Reviews & feedback
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
          alignSelf={"end"}
          onClick={() => {
            localStorage.setItem("login", false);
            navigate("/");
          }}
          mt={[0, 0, "100px", "100px"]}
        >
          Logout
        </Button>
      </TableContainer>
    </Box>
  );
}
