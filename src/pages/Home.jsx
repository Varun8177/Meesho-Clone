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

// const CurrentPage = (val = 1) => {
//   let pageNumber = Number(val);
//   if (typeof pageNumber !== "number") {
//     pageNumber = 1;
//   }
//   if (pageNumber <= 0) {
//     pageNumber = 1;
//   }
//   return pageNumber;
// };

export default function Home() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
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
      setData([...dress.data, ...dress2.data, ...kids.data]);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    MensData();
  }, []);

  // const handleClick = (val, limit) => {
  //   setpage(page + val);
  //   setLimit(limitShownm + limit);
  // window.scroll({
  //   top: 0,
  //   left: 0,
  // });
  // };

  const HandleSort = async (val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?page=2&limit=12&sortBy=price&order=${val}`
      );
      const dress2 = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?page=2&limit=12&sortBy=price&order=${val}`
      );
      const kids = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/kids?page=2&limit=12&sortBy=price&order=${val}`
      );
      setData([...dress.data, ...dress2.data, ...kids.data]);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
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
          <Box
            cursor={"pointer"}
            h={"fit-content"}
            border={"1px solid rgb(240, 240, 240)"}
            p={"5px 10px 5px 10px"}
            mb={"20px"}
            pos={{ base: "none", sm: "none", md: "sticky", lg: "sticky" }}
            top={{ base: "none", sm: "none", md: "150", lg: "130" }}
          >
            <Accordion allowMultiple w={"316px"}>
              <AccordionItem border={"0"}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize={"xl"}>
                      Sort by :{sort}
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
                  >
                    Low to High
                  </Text>
                  <hr />
                  <Text
                    onClick={() => {
                      HandleSort("desc");
                      setSort("High to Low");
                    }}
                  >
                    High to Low
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
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
                        api={"https://63c701b54ebaa80285521e6e.mockapi.io/men"}
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
