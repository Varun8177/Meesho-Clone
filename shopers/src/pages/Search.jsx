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
import { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductCards from "../components/home/ProductCards";
import LoadingScreen from "../components/home/LoadingScreen";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import { SearchContext } from "../context/searchContext";

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

export default function Search() {
  const { Searchvalue } = useContext(SearchContext);
  const [sort, setSort] = useState("Price");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [params, setParams] = useSearchParams();
  const [limitShownm, setLimit] = useState(1);
  const [page, setpage] = useState(CurrentPage(params.get("page")));
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const KidsData = async (page, Searchvalue) => {
    setLoad(true);
    try {
      const dress = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/men?page=${page}&limit=15&search=${Searchvalue}`
      );
      const dress2 = await axios.get(
        `https://63c7f361075b3f3a91d6b179.mockapi.io/women-ethnic?page=${page}&limit=15&search=${Searchvalue}`
      );
      const kids = await axios.get(
        `https://63c701b54ebaa80285521e6e.mockapi.io/kids?page=${page}&limit=15&search=${Searchvalue}`
      );
      setData([...dress.data, ...dress2.data, ...kids.data]);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    KidsData(page, Searchvalue);
  }, [page, Searchvalue]);

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
  return (
    <Box>
      <Navbar />
      <Box w={"87%"} m={"auto"} mt={{ base: "30px", sm: "30px", md: "-25px" }}>
        <Stack>
          <Stack spacing={8} direction="row">
            <Box p={5}>
              <Heading fontSize="xl">Choose Your fashion</Heading>
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
          {/* Products rendering */}

          <Box ml={"20px"}>
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
