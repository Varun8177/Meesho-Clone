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

export default function AddItem() {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [price, setprice] = useState("");
  const [images, setimage] = useState("");

  const postItem = (title, price, image) => {
    return axios.post("https://63c701b54ebaa80285521e6e.mockapi.io/men", {
      title,
      price,
      images,
      rating: "3.0",
      reviews: "35 reviews",
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
        >
          {/* contact Input */}
          <Heading fontSize={"lg"} mb={"20px"}>
            Add Product
          </Heading>
          <Select placeholder="Select Category" mb={"25px"}>
            <option value="option1">Women Ethnics</option>
            <option value="option2">Women Western</option>
            <option value="option3">Men</option>
            <option value="option4">Kids</option>
            <option value="option5">Electronics</option>
            <option value="option6">Home & Kitchen</option>
            <option value="option6">Beauty & Health</option>
          </Select>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Title"
              mb={"25px"}
              borderTop={"0"}
              borderRight={"0"}
              borderLeft={"0"}
              borderRadius={"0"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="image"
              mb={"25px"}
              borderTop={"0"}
              borderRight={"0"}
              borderLeft={"0"}
              borderRadius={"0"}
              onChange={(e) => setimage(e.target.value)}
            />
          </FormControl>

          {/* Address input */}
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Price"
              mb={"25px"}
              borderTop={"0"}
              borderRight={"0"}
              borderLeft={"0"}
              borderRadius={"0"}
              onChange={(e) => setprice("r" + e.target.value)}
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
              postItem(title, price, images);
              toast({
                title: "Product Created",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            Add Product
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
