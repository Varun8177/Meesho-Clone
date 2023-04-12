import {
  Box,
  Button,
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
      w={["100%", "100%", "750px", "750px"]}
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

export default function AdminWomen() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const arr = [1, 2, 3];
  const MensData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic`
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
      const dress = await axios
        .delete(
          `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic/${id}`
        )
        .then((res) => {
          MensData(page);
        });
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const MenssearchData = async (page, val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?page=${page}&limit=3&search=${val}`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    MensData(page);
  }, [page]);

  const handleClick = (val) => {
    setpage(page + val);
    window.scroll({
      top: 0,
      left: 0,
    });
  };
  return (
    <Box bgColor={"#fafafa"}>
      <AdminNavbar />
      <Flex p={"10px"} w={"80%"} m={"auto"} justifyContent={"space-between"}>
        <AdminSidebar />
        <Box
          w={["100%", "100%", "750px", "750px"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="scroll"
          p={"15px"}
          bgColor={"white"}
          h={"80vh"}
        >
          <Input
            placeholder="Enter name or id"
            onChange={(e) => {
              setsearch(e.target.value);
              MenssearchData(page, search);
            }}
          />
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
