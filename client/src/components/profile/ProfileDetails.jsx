import React from "react";
import { Button, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ProfileDetails = ({ ToggleShowDetails }) => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <TableContainer w="90%" m="auto" alignSelf={"baseline"} p={"1rem"}>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>{user?.name}</Td>
          </Tr>
          <Tr>
            <Td>Mobile Number</Td>
            <Td>{user?.mobile}</Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{user?.email}</Td>
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
        color={"white"}
        onClick={() => ToggleShowDetails(false)}
      >
        EDIT
      </Button>
    </TableContainer>
  );
};

export default ProfileDetails;
