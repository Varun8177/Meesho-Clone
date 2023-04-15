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

export default function WomenEthnic() {
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [params, setParams] = useSearchParams();
  const [limitShownm, setLimit] = useState(1);
  const [page, setpage] = useState(CurrentPage(params.get("page")));
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const WomenEthnicData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?page=${page}&limit=12`
      );

      const newArray = [...dress.data];

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
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?search=${val}`
      );
      setData(dress.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    WomenEthnicData(page);
    // postreq();
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
      // behavior: "smooth",
    });
  };

  return (
    <Box>
      <Navbar />
      <Box w={"87%"} m={"auto"} mt={{ base: "10px", md: "-25px" }}>
        <Stack>
          <Stack spacing={8} direction="row">
            <Box p={{ base: 0, md: 5 }}>
              <Heading fontSize="xl">Women Ethnic Wear</Heading>
              <Text mt={4}>
                Showing {limitShownm}-{limitShownm + 9} out of 10000 products
              </Text>
            </Box>
          </Stack>
        </Stack>

        <Flex
          mt={{ base: "20px", sm: "30px", md: "20px" }}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Box>
            <Box
              pos={{
                base: "none",
                sm: "none",
                md: "sticky",
                lg: "sticky",
              }}
              top={{ base: "0", sm: "0", md: "100", lg: "130" }}
            >
              {/* sort here */}
              <Box
                border={"1px solid rgb(240, 240, 240)"}
                p={"5px 10px 5px 10px"}
                mb={"20px"}
                borderRadius={"8px"}
              >
                <Accordion
                  allowMultiple
                  w={{
                    base: "auto",
                    md: "220px",
                    lg: "316px",
                  }}
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

              {/* Filter here */}
              <Box
                cursor={"pointer"}
                border={"1px solid rgb(240, 240, 240)"}
                p={"5px 10px 5px 10px"}
                mb={"20px"}
                borderRadius={"8px"}
              >
                <Accordion
                  allowMultiple
                  w={{
                    base: "auto",
                    md: "220px",
                    lg: "316px",
                  }}
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
                          Filter
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text
                        onClick={() => {
                          HandleFilter("saree");
                        }}
                        _hover={{
                          color: "#718096",
                        }}
                      >
                        Sarees
                      </Text>
                      <Divider my={2} borderColor="#CBD5E0" />
                      <Text
                        onClick={() => {
                          HandleFilter("Kurtis");
                        }}
                        _hover={{
                          color: "#718096",
                        }}
                      >
                        Kurtis
                      </Text>
                      <Divider my={2} borderColor="#CBD5E0" />
                      <Text
                        onClick={() => {
                          HandleFilter("Lehenga");
                        }}
                        _hover={{
                          color: "#718096",
                        }}
                      >
                        Lehenga
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
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap={{ base: "15px", md: "20px" }}
            >
              {load
                ? arr.map((item) => {
                    return <LoadingScreen key={item + 213100} />;
                  })
                : data.map((item, i) => {
                    return (
                      <ProductCards
                        {...item}
                        api={
                          "https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic"
                        }
                        key={item.title + item.id}
                        endpoint={"women-ethnic"}
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
