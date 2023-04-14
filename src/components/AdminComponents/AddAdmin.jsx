import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export default function AddAdmin() {
  //   const navigate = useNavigate();
  const toast = useToast();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");

  const postItem = (name, email, mobile) => {
    toast.closeAll();
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /\S+@\S+\.\S+/;
    if (name && email && mobile) {
      if (name && nameRegex.test(name.trim())) {
        if (email && emailRegex.test(email.trim())) {
          if (mobile.length === 10) {
            axios
              .post("https://63cd0ca00f1d5967f028fa8e.mockapi.io/admin", {
                name,
                email,
                mobile,
              })
              .then((res) => {
                toast.closeAll();
                toast({
                  title: "Admin Has been successfully created",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              })
              .catch((err) => {
                toast.closeAll();
                toast({
                  title: err.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              });
          } else {
            toast.closeAll();
            toast({
              title: "Invalid mobile number",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } else {
          toast.closeAll();
          toast({
            title: "Invalid email address",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast.closeAll();
        toast({
          title: "Invalid name",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast.closeAll();
      toast({
        title: "Please provide all the required information",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box bgColor={"#fafafa"}>
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
          bgColor={"white"}
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
            }}
          >
            Add as Admin
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
