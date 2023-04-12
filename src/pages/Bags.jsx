import {
  Heading,
  Stack,
  Text,
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCards from "../components/home/ProductCards";
import LoadingScreen from "../components/home/LoadingScreen";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/home/Navbar";

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

export default function Bags() {
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [params, setParams] = useSearchParams();
  const [limitShownm, setLimit] = useState(1);
  const [page, setpage] = useState(CurrentPage(params.get("page")));
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const BagsData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/kids?page=${page}&limit=12`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    BagsData(page);
  }, [page]);

  useEffect(() => {
    setParams({ page });
  }, [page, setParams]);

  // Pages
  const handleClick = (val, limit) => {
    setpage(page + val);
    setLimit(limitShownm + limit);
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  // Sort
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

  const HandleFilter = async (val) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/kids?search=${val}`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Navbar />
      <Box w={"87%"} m={"auto"} mt={{ base: "30px", sm: "30px", md: "-25px" }}>
        <Stack>
          <Stack spacing={8} direction="row">
            <Box p={5}>
              <Heading fontSize="xl">Bags and Footware</Heading>
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
            <Box
              pos={{ base: "none", sm: "none", md: "sticky", lg: "sticky" }}
              top={{ base: "none", sm: "none", md: "150", lg: "130" }}
            >
              {/* sort here */}
              <Box
                border={"1px solid rgb(240, 240, 240)"}
                p={"5px 10px 5px 10px"}
                mb={"20px"}
                borderRadius={"8px"}
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

              {/* Filter here */}
              <Box
                cursor={"pointer"}
                border={"1px solid rgb(240, 240, 240)"}
                p={"5px 10px 5px 10px"}
                mb={"20px"}
                borderRadius={"8px"}
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
                          Filter
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text
                        onClick={() => {
                          HandleFilter("Frocks");
                        }}
                        _hover={{
                          color: "#718096",
                        }}
                      >
                        Frocks
                      </Text>
                      <Divider my={2} borderColor="#CBD5E0" />
                      <Text
                        onClick={() => {
                          HandleFilter("cute");
                        }}
                      >
                        Cute wear
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
                        api={"https://63c701b54ebaa80285521e6e.mockapi.io/kids"}
                        key={i}
                        endpoint={"kids"}
                      />
                    );
                  })}
            </Grid>
            <Box textAlign={"center"} mt={"20px"}>
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
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
