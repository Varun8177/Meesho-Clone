import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Badge,
  Stack,
  Text,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { StarIcon } from "@chakra-ui/icons";
import { ArrowRightIcon, EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import ProductCards from "./ProductCards";
import LoadingScreen from "./LoadingScreen";

export default function SingleProduct() {
  const myapi = sessionStorage.getItem("api");
  console.log(myapi);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  // const { api } = useContext(ApiContext);
  const params = useParams();
  const [moreProd, setMoreprod] = useState([]);
  const arr = [1, 1, 1, 1, 1];

  const productData = async () => {
    setLoad(true);
    try {
      const product = await axios.get(`${myapi}/${params.user_id}`);
      setData(product.data);
      setLoad(false);
      window.scroll({
        top: 0,
        left: 0,
        // behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const moreProdData = async () => {
    setLoad(true);
    try {
      const product = await axios.get(`${myapi}?page=3&limit=5`);
      setMoreprod(product.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    productData();
    moreProdData();
  }, [params.user_id]);

  console.log(data);

  return (
    <Box border={"1px solid red"}>
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
            h={["100%", "100%", "460px", "460px"]}
            m={"auto"}
            w={["100%", "100%", "449px", "449px"]}
          />
          <Flex
            justifyContent={"space-between"}
            w={"449px"}
            mt={"40px"}
            direction={["column", "column", "row", "row", "row"]}
          >
            <Button borderRadius={"5px"} w={"202px"}>
              Add to Cart
            </Button>
            <Button
              borderRadius={"5px"}
              width={"202px"}
              bgColor={"rgb(244, 51, 151)"}
              color={"white"}
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
                  ring: "4px",
                  ringColor: "red",
                }}
                borderRadius={"50%"}
                border="1px solid rgb(223, 223, 223)"
              >
                Xl
              </Button>
              <Button
                borderRadius={"50%"}
                border="1px solid rgb(223, 223, 223)"
              >
                S
              </Button>
              <Button
                borderRadius={"50%"}
                border="1px solid rgb(223, 223, 223)"
              >
                L
              </Button>
            </Flex>
          </Box>

          {/* Product details */}

          <Box
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
              <Text>Name:{data.title}</Text>
              <Text>price:{data.price}</Text>
              <Text>fabric:cotton</Text>
              <Text>Sizes:Xl,L,S</Text>
              <Text>Country of Origin : India</Text>
            </Stack>
          </Box>

          {/* sold by */}

          <Box
            w={["100%", "100%", "500px", "500px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            pb={"5"}
          >
            <Box p="6">
              <Heading fontSize={"xl"}>Sold by</Heading>
            </Box>
            <Stack ml={"17px"} color="rgb(102, 116, 142)">
              <Flex alignItems={"center"}>
                <IconButton
                  mr={"20px"}
                  variant="outline"
                  colorScheme="rgb(244, 51, 151)"
                  aria-label="Send email"
                  icon={<EmailIcon />}
                />
                <Text>Harekrishnafashion@gmail.com</Text>
              </Flex>
              <Button
                textAlign={"center"}
                rightIcon={<ArrowForwardIcon />}
                bgColor="rgb(244, 51, 151)"
                variant="outline"
                color={"white"}
                width={"80%"}
                margin={"auto"}
              >
                View Shop
              </Button>
            </Stack>
          </Box>
        </Box>
      </Flex>
      {/* More Products */}

      <Box ml={"20px"} display={"block"} margin={"auto"} w={"fit-content"}>
        <Heading mb={"20px"}>People also viewed</Heading>
        <Grid
          templateColumns={{
            base: "repeat(1,220px)",
            sm: "repeat(2,220px)",
            md: "repeat(4,220px)",
            lg: "repeat(5,220px)",
          }}
          gap={"20px"}
        >
          {load
            ? arr.map(() => {
                return <LoadingScreen />;
              })
            : moreProd.map((item, i) => {
                return (
                  <ProductCards
                    {...item}
                    api={myapi}
                    key={i}
                    endpoint={"mens"}
                  />
                );
              })}
        </Grid>
      </Box>
    </Box>
  );
}
