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
import Mens from "./Mens";
import {
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCards from "../components/home/ProductCards";
import LoadingScreen from "../components/home/LoadingScreen";
import { useSearchParams } from "react-router-dom";

const CurrentPage = (val = 1) => {
  let pageNumber = Number(val);
  if (typeof pageNumber !== "number") {
    pageNumber = 1;
  }
  if (pageNumber <= 0) {
    pageNumber = 1;
  }
  return pageNumber;
};

export default function Home() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [params, setParams] = useSearchParams();
  const [limitShownm, setLimit] = useState(1);
  const [page, setpage] = useState(CurrentPage(params.get("page")));
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const MensData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?page=${page}&limit=12`
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

  useEffect(() => {
    setParams({ page });
  }, [page, setParams]);

  const handleClick = (val, limit) => {
    setpage(page + val);
    setLimit(limitShownm + limit);
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  const HandleSort = async (val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?page=${page}&limit=12&sortBy=price&order=${val}`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Image m={"auto"} src={Homepage_banner} mb={"20px"} w={"1106px"} />
      <Heading fontSize="3xl" margin={"auto"} w={"fit-content"} mb={"20px"}>
        -Top Categories to choose from-
      </Heading>
      <Flex
        mb={"30px"}
        w={"80%"}
        p={"50px"}
        m={"auto"}
        bgImage={background_banner}
        justifyContent={"space-evenly"}
      >
        <Image
          onClick={() => navigate("/women-ethnic")}
          h={"500px"}
          src={women_category}
        />
        <Flex direction={"column"}>
          <Heading fontSize="6xl" margin={"auto"} w={"fit-content"} mb={"20px"}>
            Fashion Store
          </Heading>
          <Flex justifyContent={"space-evenly"} w={"800px"}>
            <Image
              alignSelf={"end"}
              onClick={() => navigate("/men")}
              h={"400px"}
              src={mens_banner}
            />
            <Image
              alignSelf={"end"}
              onClick={() => navigate("/kids")}
              h={"400px"}
              src={kids_banner}
            />
          </Flex>
        </Flex>
      </Flex>
      <Image m={"auto"} src={register_banner} mb={"40px"} mt={"40px"} />
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
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Box>
            {/* sort here */}
            <Box
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

            {/* Filter here */}
            <Box
              border={"1px solid rgb(240, 240, 240)"}
              p={"5px 10px 5px 10px"}
              pos={"sticky"}
              top={{ base: "none", sm: "none", md: "270", lg: "200" }}
            >
              <Box as="span" flex="1" textAlign="left" fontSize={"xl"}>
                Filters
              </Box>
              <Accordion defaultIndex={[0]} allowMultiple w={"316px"}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Section 1 title
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Section 2 title
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
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
                        api={"https://63c701b54ebaa80285521e6e.mockapi.io/men"}
                        key={i}
                        endpoint={"men"}
                      />
                    );
                  })}
            </Grid>
            <Button
              isDisabled={page === 1}
              onClick={() => handleClick(-1, -10)}
            >
              Previous
            </Button>
            <Button isDisabled>{page}</Button>
            <Button
              isDisabled={data.length !== 12}
              onClick={() => handleClick(1, 10)}
            >
              Next
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
