import {
  Box,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const baseurl = process.env.REACT_APP_BASE_URL;

const Searchbar = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getSearchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/products/search/${text}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounce = (text, delay) => {
    const timer = setTimeout(() => {
      if (text) {
        getSearchData();
      }
    }, delay);
    return timer;
  };
  useEffect(() => {
    const timer = debounce(text, 400);
    if (!text) {
      setData([]);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <Box
      pos="relative"
      width={{
        base: "100%",
        lg: "300px",
        xl: "400px",
      }}
    >
      <InputGroup alignItems="center">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch color="gray" style={{ marginTop: "10px" }} />}
        />
        <Input
          type="search"
          htmlSize={10}
          width={{
            base: "100%",
            lg: "300px",
            xl: "400px",
          }}
          borderRadius="5px"
          h={{ base: "40px", sm: "45px" }}
          borderColor="gray.300"
          focusBorderColor="gray.300"
          placeholder="Try Saree, Kurti, or search by product code"
          _placeholder={{ color: "grey.200" }}
          onChange={(e) => setText(e.target.value)}
          color="black"
          value={text}
        />
      </InputGroup>
      {text && (
        <Box
          w="full"
          h="200px"
          pos="absolute"
          bg="white"
          top="100%"
          boxShadow="lg"
          rounded="md"
          overflow="auto"
        >
          {loading ? (
            <Center h="full">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            data?.map((product, index) => (
              <Box
                key={index}
                p="4"
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
                _last={{ borderBottomWidth: "0" }}
                onClick={() => {
                  setText("");
                  navigate(`/product/${product._id}`);
                }}
                cursor={"pointer"}
              >
                <Text
                  fontWeight="bold"
                  color="black"
                  _hover={{ color: "blue.500" }}
                >
                  {product.title}
                </Text>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
