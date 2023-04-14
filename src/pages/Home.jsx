// import { Box } from "@chakra-ui/react";
// import Navbar from "../components/home/Navbar";

import { Box, Flex, Image, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Homepage_banner from "../components/images/Homepage_banner.png";
import women_category from "../components/images/women_category.png";
import background_banner from "../components/images/background_banner.png";
import kids_banner from "../components/images/kids_banner.png";
import mens_banner from "../components/images/mens_banner.png";
import register_banner from "../components/images/register_banner.png";
import {
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCards from "../components/home/ProductCards";
import LoadingScreen from "../components/home/LoadingScreen";
import Navbar from "../components/home/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [limitShownm, setLimit] = useState(1);
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const MensData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?page=2&limit=12`
      );
      const dress2 = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?page=2&limit=12`
      );
      const kids = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/kids?page=2&limit=12`
      );

      const dressData = dress.data.map((item) => {
        return {
          ...item,
          category: "men",
        };
      });

      const dress2Data = dress2.data.map((item) => {
        return {
          ...item,
          category: "women",
        };
      });

      const kidsData = kids.data.map((item) => {
        return {
          ...item,
          category: "kids",
        };
      });

      const newArray = [...dressData, ...dress2Data, ...kidsData];

      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }

      setData(newArray);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    MensData();
  }, []);

  const HandleSort = async (val) => {
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));

      if (val === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    setData(sortedData);
  };

  return (
    <Box>
      <Navbar />
      <Image m={"auto"} src={Homepage_banner} mb={"20px"} w={"1220px"} />
      <Heading
        fontSize="3xl"
        margin={"auto"}
        w={"fit-content"}
        mb={"20px"}
        _before={{
          content: `""`,
          width: "20%",
          height: "1px",
          background: "#000",
          position: "absolute",
          left: 200,
          top: 569,
        }}
        _after={{
          content: `""`,
          display: "block",
          width: "20%",
          height: "1px",
          background: "#000",
          right: 200,
          top: 569,
          position: "absolute",
        }}
      >
        Top Categories to choose from
      </Heading>
      <Flex
        mb={"30px"}
        w={{ base: "100%", md: "80%" }}
        p={{ base: "20px", md: "50px" }}
        m={"auto"}
        bgImage={background_banner}
        bgSize="cover"
        justifyContent={{ base: "center", md: "space-evenly" }}
        alignItems={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          onClick={() => navigate("/women-ethnic")}
          h={{ base: "300px", md: "500px" }}
          w={{ base: "100%", md: "auto" }}
          src={women_category}
          mb={{ base: "20px", md: "0" }}
          objectFit={"contain"}
        />
        <Flex
          direction={"column"}
          alignItems={{ base: "center", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
          w={{ base: "100%", md: "auto" }}
          ml={{ base: "0", md: "50px" }}
          mt={{ base: "20px", md: "0" }}
        >
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            mb={{ base: "10px", md: "20px" }}
          >
            Fashion Store
          </Heading>
          <Flex
            justifyContent={{ base: "center", md: "space-evenly" }}
            w={{ base: "100%", md: "800px" }}
          >
            <Image
              onClick={() => navigate("/men")}
              h={{ base: "200px", md: "400px" }}
              src={mens_banner}
              mb={{ base: "20px", md: "0" }}
              objectFit={"contain"}
            />
            <Image
              onClick={() => navigate("/kids")}
              h={{ base: "200px", md: "400px" }}
              src={kids_banner}
              objectFit={"contain"}
            />
          </Flex>
        </Flex>
      </Flex>

      <Image
        m={"auto"}
        src={register_banner}
        mb={"40px"}
        mt={"40px"}
        w={"100%"}
        maxW={"1220"}
      />
      <Box w={"87%"} m={"auto"} mt={{ base: "30px", sm: "30px", md: "-25px" }}>
        <Stack>
          <Stack spacing={8} direction="row">
            <Box p={5}>
              <Heading fontSize="xl">Products for you</Heading>
              <Text mt={4}>
                Showing {limitShownm}-{limitShownm + 9} out of 10000 products
              </Text>
            </Box>
          </Stack>
        </Stack>

        <Flex
          mt={{ base: "50px", sm: "50px", md: "20px" }}
          direction={["column", "column", "row"]}
        >
          {/* sort here */}
          <Box>
            <Box
              pos={{ base: "sticky", sm: "sticky", md: "sticky", lg: "sticky" }}
              top={{ base: "0", sm: "0", md: "150", lg: "130" }}
            >
              <Box
                border={"1px solid rgb(240, 240, 240)"}
                p={"5px 10px 5px 10px"}
                mb={"20px"}
                borderRadius={"8px"}
                h={"fit-content"}
              >
                <Accordion allowMultiple w={"316px"}>
                  <AccordionItem border={"0"}>
                    <h2>
                      <AccordionButton
                        _hover={{
                          background: "transparent",
                          color: "#718096",
                        }}
                        _focus={{
                          outline: "none",
                          boxShadow: "none",
                        }}
                        _expanded={{
                          background: "transparent",
                          color: "#718096",
                        }}
                      >
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={"xl"}
                        >
                          Sort by : {sort}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text
                        onClick={() => {
                          HandleSort("asc");
                          setSort("Low to High");
                        }}
                        p={"5"}
                        _hover={{
                          cursor: "pointer",
                          background: "#F7FAFC",
                          color: "#718096",
                        }}
                      >
                        Low to High
                      </Text>
                      <hr />
                      <Text
                        onClick={() => {
                          HandleSort("desc");
                          setSort("High to Low");
                        }}
                        p={5}
                        _hover={{
                          cursor: "pointer",
                          background: "#F7FAFC",
                          color: "#718096",
                        }}
                      >
                        High to Low
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </Box>

          {/* Products rendering */}

          <Box ml={"20px"}>
            <Grid
              templateColumns={{
                base: "repeat(1,220px)",
                sm: "repeat(2,220px)",
                md: "repeat(3,220px)",
                lg: "repeat(4,220px)",
              }}
              gap={"20px"}
            >
              {load
                ? arr.map(() => {
                    return <LoadingScreen />;
                  })
                : data.map((item, i) => {
                    return (
                      <ProductCards
                        {...item}
                        api={
                          item.category === "men"
                            ? "https://63c701b54ebaa80285521e6e.mockapi.io/men"
                            : item.category === "women"
                            ? "https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic"
                            : item.category === "kids"
                            ? "https://63c701b54ebaa80285521e6e.mockapi.io/kids"
                            : null
                        }
                        key={i}
                        endpoint={"men"}
                      />
                    );
                  })}
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
