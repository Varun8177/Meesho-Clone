import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { HiPlus } from "react-icons/hi";
function SingleProd({ images, title, price, handleDelete, id }) {
  return (
    <Box
      w={"100%"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      p={"15px"}
    >
      <Flex alignItems="center">
        <Image src={images} w={"100px"} borderRadius="md" mr="4" />
        <Stack color="gray.500">
          <Text fontWeight="bold" fontSize="lg">
            {title}
          </Text>
          <Text fontSize="md">Price: {price}</Text>
          <Button variant={"outline"}>Edit</Button>
        </Stack>
        <Button
          onClick={() => {
            handleDelete(id);
          }}
          size="sm"
          variant="outline"
          ml="auto"
        >
          X
        </Button>
      </Flex>
    </Box>
  );
}

function SingleProdSkeleton({ images, title, price, handleDelete, id }) {
  return (
    <Skeleton
      w={"100%"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={"20px"}
      p={"15px"}
    >
      {/* Product */}
      <Flex>
        <Image src={images} w={"100px"} />
        <Flex
          //   border={"1px solid red"}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Stack ml={"17px"} color="rgb(102, 116, 142)">
            <Text>Title:{title}</Text>
            <Text>Size</Text>
            <Text>price :{price}</Text>
          </Stack>
          <Stack>
            <Button
              onClick={() => {
                handleDelete(id);
              }}
            >
              X
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Skeleton>
  );
}

export default function AdminMens() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  // const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const arr = [1, 2, 3];
  const MensData = async () => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    setLoad(true);
    try {
      axios
        .delete(`https://63c701b54ebaa80285521e6e.mockapi.io/men/${id}`)
        .then((res) => {
          MensData();
        });
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const MenssearchData = async (val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?search=${val}`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    MensData();
  }, []);

  return (
    <Box bgColor={"#fafafa"}>
      <AdminNavbar />
      <Flex p={"10px"} w={"80%"} m={"auto"} justifyContent={"space-between"}>
        <AdminSidebar />
        <Box
          bgColor={"white"}
          w={["100%", "100%", "750px", "750px"]}
          borderWidth="1px"
          borderRadius="lg"
          h={"80vh"}
          overflow="scroll"
          p={"15px"}
          border="1px solid #E5E7EB"
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            mb={"10px"}
            alignItems={"center"}
          >
            <Input
              placeholder="Enter name or id"
              width={"50%"}
              onChange={(e) => {
                setsearch(e.target.value);
                MenssearchData(search);
              }}
            />
            <Flex
              alignItems="center"
              w="150px"
              justifyContent="space-between"
              bg="gray.100"
              p="2"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: "gray.200" }}
            >
              <Text fontWeight="semibold">Add Product</Text>
              <HiPlus size={20} />
            </Flex>
          </Flex>
          <Divider />
          {/* Product */}
          {load
            ? arr.map((item) => {
                return <SingleProdSkeleton {...item} />;
              })
            : data.map((item) => {
                return <SingleProd {...item} handleDelete={handleDelete} />;
              })}
        </Box>
      </Flex>
    </Box>
  );
}
