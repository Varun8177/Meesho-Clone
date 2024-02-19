import {
  Box,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../redux/slices/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const links = [
    { label: "Profile", path: "/profile" },
    { label: "Orders", path: "/profile?type=user-orders" },
    { label: "Address", path: "/profile?type=address" },
    { label: "Terms & Conditions", path: "/profile" },
    { label: "Help Center", path: "/profile" },
    { label: "Reviews & feedback", path: "/profile?type=review" },
  ];
  const handleNavigation = (path) => () => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    dispatch(logoutSuccess());
    navigate("/");
  };

  return (
    <Box alignItems="center" pb="5">
      <TableContainer w="90%" m="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center" fontWeight="bold">
                Dashboard
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {links.map((item, index) => (
              <Tr key={index}>
                <Td
                  cursor="pointer"
                  _hover={{ bgColor: "#F3F4F6" }}
                  onClick={handleNavigation(item.path)}
                >
                  {item.label}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button
          w="100%"
          m="auto"
          bgColor="pink.400"
          _hover={{ bg: "pink.500" }}
          cursor="pointer"
          color="white"
          alignSelf="end"
          onClick={handleLogout}
          mt={[0, 0, "100px", "100px"]}
        >
          Logout
        </Button>
      </TableContainer>
    </Box>
  );
};

export default Sidebar;
