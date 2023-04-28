import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export default function AddItem() {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [load, setLoad] = useState(false);
  const [category, setCategory] = useState("");
  async function handleImageChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "vmtbjhvd");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgze3lj0n/image/upload",
          formData
        );
        setImages(response.data.secure_url);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const postItem = (title, price, images) => {
    setLoad(true);
    let url = "";
    if (category === "Women-Western") {
      url = "https://63c6ba9bd307b769673fb1fa.mockapi.io/women-western";
    } else if (category === "Women-Ethnics") {
      url = "https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic";
    } else if (category === "Men") {
      url = "https://63c701b54ebaa80285521e6e.mockapi.io/men";
    } else if (category === "Kids") {
      url = "https://63c701b54ebaa80285521e6e.mockapi.io/kids";
    } else if (category === "Beauty&Health") {
      url = "https://63c705d44ebaa80285526612.mockapi.io/makeup";
    } else if (category === "Electronics") {
      url = "https://63c705d44ebaa80285526612.mockapi.io/makeup";
    } else if (category === "Home&Kitchen") {
      url = "https://63c705d44ebaa80285526612.mockapi.io/home-kitchen";
    } else if (category === "") {
      toast.closeAll();
      toast({
        title: "Please select a category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoad(false);
    } else {
      url = "https://63c701b54ebaa80285521e6e.mockapi.io/men";
    }
    if (title && price && images) {
      axios
        .post(url, {
          title,
          price,
          images,
          rating: "3.0",
          reviews: "35 reviews",
        })
        .then((res) => {
          toast.closeAll();
          toast({
            title: "Product Created",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLoad(false);
        })
        .catch((err) => {
          toast.closeAll();
          toast({
            title: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoad(false);
        });
    } else {
      toast.closeAll();
      toast({
        title: "Fill all details to create a product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoad(false);
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
          p={"25px"}
          m={"auto"}
          bgColor={"white"}
          as="form"
        >
          {/* contact Input */}
          <Heading fontSize={"lg"} mb={"20px"}>
            Add Product
          </Heading>
          <Select
            placeholder="Select Category"
            mb={"25px"}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Women-Ethnics">Women Ethnics</option>
            <option value="Women-Western">Women Western</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
            <option value="Electronics">Electronics</option>
            <option value="Home&Kitchen">Home & Kitchen</option>
            <option value="Beauty&Health">Beauty&Health</option>
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
              onChange={(e) => setPrice("r" + e.target.value)}
            />
          </FormControl>
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab>URL</Tab>
              <Tab>Upload Image from Desktop</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl isRequired>
                  <Input
                    type="text"
                    placeholder="or paste a link to an image"
                    borderTop="0"
                    borderRight="0"
                    borderLeft="0"
                    borderRadius="0"
                    onChange={(e) => setImages(e.target.value)}
                  />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl isRequired>
                  <Input
                    type="file"
                    placeholder="Choose an image from your desktop"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    mb="10px"
                  />
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Button
            type="submit"
            textAlign={"center"}
            bgColor="rgb(244, 51, 151)"
            variant="outline"
            color={"white"}
            width={"100%"}
            _hover={{ bg: "rgb(199, 60, 157)" }}
            onClick={() => {
              postItem(title, price, images);
            }}
            isDisabled={title === "" || price === "" || images === ""}
            isLoading={load}
            loadingText="Processing..."
          >
            Add Product
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
