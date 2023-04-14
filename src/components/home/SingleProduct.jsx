/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Badge,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { ArrowRightIcon } from "@chakra-ui/icons";
import MoreProducts from "../singleproduct/MoreProd";
import Soldby from "../singleproduct/Soldby";
import Navbar from "./Navbar";
import { useContext } from "react";
import { TotalContext } from "../../context/TotalContext";

export default function SingleProduct() {
  const myapi = sessionStorage.getItem("api");
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cartData, setCartData] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [load, setLoad] = useState(false);
  const params = useParams();
  const [moreProd, setMoreprod] = useState([]);
  const toast = useToast();
  const id = localStorage.getItem("id");
  const login = localStorage.getItem("login");
  const { handleTotalCost } = useContext(TotalContext);
  const navigate = useNavigate();

  function removeTunics(str) {
    let originalStr = str;
    let updatedStr = originalStr.replace("&amp; Tunics", "");
    return updatedStr;
  }
  const productData = async () => {
    setLoad(true);
    try {
      const product = await axios.get(`${myapi}/${params.user_id}`);
      let updatedTitle = removeTunics(product.data.title);
      product.data.title = updatedTitle;
      setData(product.data);
      axios
        .get(
          `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart`
        )
        .then((res) => {
          setCartData(res.data);
        });
      setLoad(false);
      window.scroll({
        top: 0,
        left: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const moreProdData = async () => {
    setLoad(true);
    try {
      const productRes = await axios.get(`${myapi}/${params.user_id}`);
      const product = productRes.data;

      const productsRes = await axios.get(`${myapi}?page=3&limit=10`);
      const availableProducts = productsRes.data.filter(
        (item) => item.title !== product.title
      );

      const moreProducts = availableProducts.slice(0, 5);
      setMoreprod(moreProducts);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productData();
    moreProdData();
  }, [params.user_id]);

  function postReq(prod, id) {
    setButtonLoad(true);
    axios
      .get(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart?title=${prod.title}`
      )
      .then((res) => {
        if (res.data.length === 0) {
          axios
            .post(
              `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart`,
              prod
            )
            .then((res) => {
              toast({
                title: "Product added to cart",
                description: `Check your cart`,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              setButtonLoad(false);
            })
            .catch((error) => {
              console.log(error);
              toast({
                title: "An error occurred",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              setButtonLoad(false);
            });
        } else {
          toast({
            title: "Already in cart",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setButtonLoad(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "An error occurred",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setButtonLoad(false);
      });
  }

  return (
    <Box>
      <Navbar />
      <Flex
        direction={["column", "column", "row", "row", "row"]}
        w={"80%"}
        m={"auto"}
        justifyContent={"space-evenly"}
        mb={"30px"}
      >
        {/* image section */}
        <Box
          border={"1px solid rgb(223, 223, 223)"}
          p={"20px"}
          height={"fit-content"}
          mt={["50px", "50px", "0px", "0px"]}
          borderRadius={"5px"}
        >
          <Image
            src={data.images}
            m={"auto"}
            w={["100%", "100%", "449px", "449px"]}
            // filter="brightness()"
          />
          <Flex
            justifyContent={"space-between"}
            w={"449px"}
            mt={"40px"}
            direction={["column", "column", "row", "row", "row"]}
          >
            <Button
              borderRadius={"5px"}
              isLoading={buttonLoad}
              w={"202px"}
              onClick={() => {
                if (login === "true") {
                  postReq(data, id);
                } else {
                  toast({
                    title: "Login to proceed",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              Add to Cart
            </Button>
            <Button
              borderRadius={"5px"}
              width={"202px"}
              bgColor={"rgb(244, 51, 151)"}
              color={"white"}
              onClick={() => {
                if (login === "true") {
                  handleTotalCost(data.price);
                  navigate("/address");
                } else {
                  toast({
                    title: "Login to proceed",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              <Box as="span" marginRight={"10px"}>
                <ArrowRightIcon />
              </Box>
              Buy now
            </Button>
          </Flex>
        </Box>

        {/* description section */}
        <Box>
          <Box
            border={"1px solid rgb(223, 223, 223)"}
            w={["100%", "100%", "500px", "500px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box p="6">
              <Heading fontSize={"xl"} color={"rgb(153, 153, 153)"}>
                {data.title}
              </Heading>

              <Box fontSize="4xl">
                {data.price}
                <Box as="span" color="gray.600" fontSize="sm">
                  /{"onwards"}
                </Box>
              </Box>
              <Badge
                mt={"15px"}
                borderRadius="full"
                px="2"
                fontSize="md"
                color={"white"}
                bgColor={
                  data.rating >= 4
                    ? "rgb(3, 141, 99)"
                    : data.rating > 2
                    ? "rgb(244, 182, 25)"
                    : "red"
                }
              >
                {data.rating}
                <StarIcon color={"white"} height={"10px"} />
              </Badge>

              <Box display="flex" mt="2" alignItems="center">
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {data.reviews}
                </Box>
              </Box>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="gray"
                mt={"10px"}
                h={"20px"}
                alignItems={"center"}
              >
                Free Delivery
              </Badge>
            </Box>
          </Box>

          {/* Select size */}

          <Box
            border={"1px solid rgb(223, 223, 223)"}
            w={["100%", "100%", "500px", "500px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            pb={"5"}
          >
            <Box p="6">
              <Heading fontSize={"xl"}>Select Size</Heading>
            </Box>
            <Flex justifyContent={"space-evenly"} width={"150px"} ml={"17px"}>
              <Button
                _focus={{
                  ring: "1px",
                  ringColor: "black",
                }}
                onClick={() => {
                  localStorage.setItem("size", "Xl");
                }}
                borderRadius={"50%"}
                border="1px solid rgb(223, 223, 223)"
              >
                Xl
              </Button>
              <Button
                _focus={{
                  ring: "1px",
                  ringColor: "black",
                }}
                borderRadius={"50%"}
                border="1px solid rgb(223, 223, 223)"
                onClick={() => {
                  localStorage.setItem("size", "Xl");
                }}
              >
                S
              </Button>
              <Button
                _focus={{
                  ring: "1px",
                  ringColor: "black",
                }}
                borderRadius={"50%"}
                border="1px solid rgb(223, 223, 223)"
                onClick={() => {
                  localStorage.setItem("size", "Xl");
                }}
              >
                L
              </Button>
            </Flex>
          </Box>

          {/* Product details */}

          <Box
            border={"1px solid rgb(223, 223, 223)"}
            w={["100%", "100%", "500px", "500px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            pb={"5"}
          >
            <Box p="6">
              <Heading fontSize={"xl"}>Product Details</Heading>
            </Box>
            <Stack ml={"17px"} color="rgb(102, 116, 142)">
              <Text>Name: {data.title}</Text>
              <Text>price: {data.price}</Text>
              <Text>fabric: cotton</Text>
              <Text>Sizes: Xl,L,S</Text>
              <Text>Country of Origin : India</Text>
            </Stack>
          </Box>

          {/* sold by */}
          <Soldby />
        </Box>
      </Flex>
      {/* More Products */}
      <MoreProducts load={load} moreProd={moreProd} myapi={myapi} />
    </Box>
  );
}
