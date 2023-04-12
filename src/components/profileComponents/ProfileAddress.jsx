import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";
import { TotalContext } from "../../context/TotalContext";
import Navbar from "../home/Navbar";
import { Sidebar } from "./Sidebar";

export default function ProfileAddress() {
  const { address } = useContext(TotalContext);
  return (
    <Box h={"100vh"}>
      <Navbar />
      <Box w={"70%"} margin={"auto"}>
        <Flex justifyContent={"space-between"} w={"100%"}>
          <Box w={"30%"} border={"1px solid rgb(223, 223, 223)"}>
            <Sidebar />
          </Box>
          <Box
            w={"67%"}
            border={"1px solid rgb(223, 223, 223)"}
            alignItems={"center"}
            pt={"10px"}
            bgColor={"#FAFAFA"}
          >
            <Box
              w={["100%", "100%", "90%", "90%"]}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={"15px"}
              m={"auto"}
              bgColor={"white"}
            >
              {/* <Heading>Address</Heading> */}
              <TableContainer w={"100%"} m={"auto"}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Address</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Name</Td>
                      <Td>{address.name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Mobile Number</Td>
                      <Td>{address.mobile}</Td>
                    </Tr>
                    <Tr>
                      <Td>House no.</Td>
                      <Td>{address.house}</Td>
                    </Tr>
                    <Tr>
                      <Td>area</Td>
                      <Td>{address.area}</Td>
                    </Tr>
                    <Tr>
                      <Td>pincode</Td>
                      <Td>{address.pincode}</Td>
                    </Tr>
                    <Tr>
                      <Td>city</Td>
                      <Td>{address.city}</Td>
                    </Tr>
                    <Tr>
                      <Td>Country</Td>
                      <Td>{address.country}</Td>
                    </Tr>
                    <Tr>
                      <Td>Nearby Location</Td>
                      <Td>{address.location}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              {/* Product */}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
