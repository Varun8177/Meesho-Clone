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
        w={{ base: "95%", xl: "80%" }}
        m={"auto"}
        justifyContent={{ base: "space-between", xl: "space-evenly" }}
        mb={"30px"}
        gap={{ base: "20px", md: "0" }}
      >
        {/* image section */}
        <Box
          border={"1px solid rgb(223, 223, 223)"}
          p={{ base: 0, md: "20px" }}
          height={"fit-content"}
          mt={["20px", "20px", "0px", "0px"]}
          borderRadius={"5px"}
        >
          <Image
            src={data.images}
            m={"auto"}
            w={{ base: "300px", md: "70%", xl: "449px" }}
            objectFit={"contain"}
          />
          <Flex
            justifyContent={{ base: "space-evenly", md: "space-between" }}
            w={{ base: "90%", md: "80%", xl: "449px" }}
            mt={{ base: "10px", md: "20px" }}
            mb={{ base: "10px", md: "20px" }}
            m={{ base: "auto", md: "20px" }}
          >
            <Button
              borderRadius={"5px"}
              isLoading={buttonLoad}
              mt={{ base: "20px" }}
              mb={{ base: "20px" }}
              w={{ base: "40%", md: "130px", xl: "202px" }}
              onClick={() => {
                if (login === "true") {
                  postReq(data, id);
                } else {
                  toast.closeAll();
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
              mt={{ base: "20px" }}
              mb={{ base: "20px" }}
              w={{ base: "40%", md: "130px", xl: "202px" }}
              bgColor={"rgb(244, 51, 151)"}
              color={"white"}
              ml={{ md: "10px" }}
              onClick={() => {
                if (login === "true") {
                  handleTotalCost(data.price);
                  navigate("/address");
                } else {
                  toast.closeAll();
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
            w={{ base: "100%", md: "400px", lg: "500px", xl: "500px" }}
            ml={{ md: "10px" }}
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
            w={{ base: "100%", md: "400px", lg: "500px", xl: "500px" }}
            borderWidth="1px"
            borderRadius="lg"
            ml={{ md: "10px" }}
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
            w={{ base: "100%", md: "400px", lg: "500px", xl: "500px" }}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            ml={{ md: "10px" }}
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
