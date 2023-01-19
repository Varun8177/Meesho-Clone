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

export default function WomenEthnic() {
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [params, setParams] = useSearchParams();
  const [limitShownm, setLimit] = useState(1);
  const [page, setpage] = useState(CurrentPage(params.get("page")));
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const WomenEthnicData = async (page) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?page=${page}&limit=12`
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
  };

  // function postreq() {
  //   const mydata = [
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/66460699/iwvu5_400.jpg",
  //       title: "Unique Face Makeup Combo",
  //       price: "₹163",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.5",
  //       reviews: "1837 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/124914009/8mnxm_400.jpg",
  //       title: "Useful Face Makeup Combo",
  //       price: "₹198",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.7",
  //       reviews: "92 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/156076638/wzxme_400.jpg",
  //       title: "New Collections Of Face Makeup Combo",
  //       price: "₹162",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.5",
  //       reviews: "22 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/139548846/zb76k_400.jpg",
  //       title: "Proffesional Intense  Face Makeup Combo",
  //       price: "₹184",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.4",
  //       reviews: "18 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/50239976/flnw0_400.jpg",
  //       title: "Fancy Face Makeup Combo",
  //       price: "₹125",
  //       onwards: "11h : 40m : 29s",
  //       delivery: "Free Delivery",
  //       rating: "3.6",
  //       reviews: "1210 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/158350864/a42z7_400.jpg",
  //       title: "Unique Face Makeup Combo",
  //       price: "₹262",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.7",
  //       reviews: "13 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/128761219/abhuh_400.jpg",
  //       title: "New Collections Of Face Makeup Combo",
  //       price: "₹342",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.7",
  //       reviews: "108 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/70683238/djwyf_400.jpg",
  //       title: "Classic Face Makeup Combo",
  //       price: "₹461",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.9",
  //       reviews: "536 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/71059776/a5wyl_400.jpg",
  //       title: "Unique Face Makeup Combo",
  //       price: "₹353",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.9",
  //       reviews: "14 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/160368110/j4w5v_400.jpg",
  //       title: "Classy Face Makeup Combo",
  //       price: "₹289",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.8",
  //       reviews: "86 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/148441853/uzqr4_400.jpg",
  //       title: "Everyday Face Makeup Combo",
  //       price: "₹148",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.4",
  //       reviews: "128 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/151115943/kbtik_400.jpg",
  //       title: "Face Makeup Combo",
  //       price: "₹259",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.0",
  //       reviews: "7 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/45609293/g1ojg_400.jpg",
  //       title: "Useful Face Makeup Combo",
  //       price: "₹342",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.9",
  //       reviews: "957 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/137982948/ixn8p_400.jpg",
  //       title: "Classy face Makeup Combo",
  //       price: "₹183",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.9",
  //       reviews: "7 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/142813804/gqzlf_400.jpg",
  //       title: "Fancy Face Makeup Combo",
  //       price: "₹202",
  //       onwards: "onwards",
  //       delivery: "Free Delivery",
  //       rating: "3.9",
  //       reviews: "301 Reviews",
  //     },
  //     {
  //       images:
  //         "https://images.meesho.com/images/products/144403441/khlfl_400.jpg",
  //       title: "Talcum Powder",
  //       price: "₹215",
  //       onwards: "onwards",
  //       delivery: "Delivery ₹70",
  //       rating: "4.5",
  //       reviews: "13 Reviews",
  //     },
  //   ];
  //   for (let i = 0; i < mydata.length; i++) {
  //     axios.post(
  //       `https://63c705d44ebaa80285526612.mockapi.io/makeup/`,
  //       mydata[i]
  //     );
  //   }
  // }

  console.log(data);
  return (
    <Box w={"87%"} m={"auto"} mt={{ base: "30px", sm: "30px", md: "-25px" }}>
      <Stack>
        <Stack spacing={8} direction="row">
          <Box p={5}>
            <Heading fontSize="xl">Women Ethnic Wear</Heading>
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
                  <Text onClick={() => setSort("Low to High")}>
                    Low to High
                  </Text>
                  <Text onClick={() => setSort("High to Low")}>
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
                      api={
                        "https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic"
                      }
                      key={i}
                    />
                  );
                })}
          </Grid>
          <Button isDisabled={page === 1} onClick={() => handleClick(-1, -10)}>
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
  );
}
