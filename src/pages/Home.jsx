// import { Box } from "@chakra-ui/react";
// import Navbar from "../components/home/Navbar";

import { Box, Flex, Image, Heading, Show } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Homepage_banner from "../components/images/Homepage_banner.png";
import women_category from "../components/images/women_category.jpg";
import background_banner2 from "../components/images/background_banner2.jpg";
import kids_banner from "../components/images/kids_banner.jpg";
import mens_banner from "../components/images/mens_banner.jpg";
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
      <Show above="lg">
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
            left: "50%",
            transform: "translateX(-50%)",
            top: "100%",
          }}
          _after={{
            content: `""`,
            display: "block",
            width: "20%",
            height: "1px",
            background: "#000",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "100%",
          }}
        >
          Top Categories to choose from
        </Heading>
      </Show>
      <Show below="lg">
        <Heading fontSize="xl" margin={"auto"} w={"fit-content"} mb={"20px"}>
          Top Categories to choose from
        </Heading>
      </Show>
      {/* <Show above="lg"> */}
      <Flex
        mb={"30px"}
        w={{ base: "100%", md: "100%", lg: "100%", xl: "80%" }}
        m={"auto"}
        bgImage={{
          base: background_banner2,
          xl: "https://images.meesho.com/images/marketing/1678691670429.jpg",
        }}
        overflow={"hidden"}
        alignItems={"baseline"}
        pt={"5"}
        pb={"5"}
      >
        <Image
          onClick={() => navigate("/women-ethnic")}
          h={{
            base: "100px",
            sm: "150px",
            md: "200px",
            lg: "300px",
            xl: "400px",
          }}
          w={{ base: "50%", md: "50%", lg: "50%" }}
          src={women_category}
          mb={{ base: "20px", md: "0" }}
          objectFit={"contain"}
        />

        <Image
          onClick={() => navigate("/men")}
          h={{
            base: "100px",
            sm: "150px",
            md: "200px",
            lg: "300px",
            xl: "250px",
          }}
          w={{ base: "50%", md: "50%", lg: "50%" }}
          src={mens_banner}
          mb={{ base: "20px", md: "0" }}
          objectFit={"contain"}
        />
        <Image
          onClick={() => navigate("/kids")}
          h={{
            base: "100px",
            sm: "150px",
            md: "200px",
            lg: "300px",
            xl: "250px",
          }}
          w={{ base: "50%", md: "50%", lg: "50%" }}
          src={kids_banner}
          mb={{ base: "20px", md: "0" }}
          objectFit={"contain"}
        />
      </Flex>
      {/* </Show> */}
      <Show below="lg"></Show>

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
          p={0}
          direction={["column", "column", "column", "row"]}
        >
          {/* sort here */}
          <Box>
            <Box
              pos={{
                base: "initial",
                sm: "sticky",
                md: "sticky",
                lg: "sticky",
              }}
              top={{ base: "0", sm: "0", md: "150", lg: "130" }}
            >
              <Box
                border={"1px solid rgb(240, 240, 240)"}
                p={"5px 10px 5px 10px"}
                mb={"20px"}
                borderRadius={"8px"}
                h={"fit-content"}
              >
                <Accordion
                  allowMultiple
                  w={{
                    base: "auto",
                    md: "316px",
                  }}
                  m={{ md: 0, base: "auto" }}
                >
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

          <Box>
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap={{ base: "15px", md: "20px" }}
            >
              {load
                ? arr.map((item, i) => {
                    return <LoadingScreen key={i} />;
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
