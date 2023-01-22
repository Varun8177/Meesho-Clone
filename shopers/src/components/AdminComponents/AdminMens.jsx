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

export default function AdminMens() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const arr = [1, 2, 3];
  const MensData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?&page=${page}&limit=3`
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
        .delete(`https://63c701b54ebaa80285521e6e.mockapi.io/men/${id}`)
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
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?page=${page}&limit=3&search=${val}`
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
    <Box>
      <AdminNavbar />
      <Flex p={"10px"} w={"80%"} m={"auto"}>
        <AdminSidebar />
        <Box
          w={["100%", "100%", "750px", "750px"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={"15px"}
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
          <Box textAlign={"center"} mt={"20px"}>
            <Button
              isDisabled={page === 1}
              onClick={() => handleClick(-1, -10)}
            >
              Previous
            </Button>
            <Button isDisabled>{page}</Button>
            <Button
              isDisabled={data.length !== 3}
              onClick={() => handleClick(1, 10)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
