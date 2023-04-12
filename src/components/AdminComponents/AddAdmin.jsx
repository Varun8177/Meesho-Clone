import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export default function AddAdmin() {
  //   const navigate = useNavigate();
  const toast = useToast();
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");

  const postItem = (name, email, mobile) => {
    return axios.post("https://63cd0ca00f1d5967f028fa8e.mockapi.io/admin", {
      name,
      email,
      mobile,
    });
  };
  return (
    <Box>
      <AdminNavbar />
      <Flex p={"10px"} w={"80%"} m={"auto"}>
        <AdminSidebar />
        <Box
          w={["100%", "100%", "60%", "60%"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={"25px"}
          m={"auto"}
          h={"80vh"}
          alignItems={"center"}
        >
          {/* contact Input */}
          <Heading fontSize={"lg"} mb={"20px"}>
            Add A New Admin
          </Heading>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Name"
              mb={"25px"}
              borderTop={"0"}
              borderRight={"0"}
              borderLeft={"0"}
              borderRadius={"0"}
              onChange={(e) => setname(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Mobile Number"
              mb={"25px"}
              borderTop={"0"}
              borderRight={"0"}
              borderLeft={"0"}
              borderRadius={"0"}
              onChange={(e) => setmobile(e.target.value)}
            />
          </FormControl>

          {/* Address input */}
          <FormControl isRequired>
            <Input
              type="email"
              placeholder="Email"
              mb={"25px"}
              borderTop={"0"}
              borderRight={"0"}
              borderLeft={"0"}
              borderRadius={"0"}
              onChange={(e) => setemail(e.target.value)}
            />
          </FormControl>
          <Button
            textAlign={"center"}
            bgColor="rgb(244, 51, 151)"
            variant="outline"
            color={"white"}
            width={"100%"}
            _hover={{ bg: "rgb(199, 60, 157)" }}
            onClick={() => {
              postItem(name, email, mobile);
              toast({
                title: "Added as Admin",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            Add as Admin
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
