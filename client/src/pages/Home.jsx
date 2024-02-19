import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import CategoryPoster from "../components/home/CategoryPoster";
import ProductHeader from "../components/products/ProductHeader";
import FilterSortMenu from "../components/products/FilterSortMenu";
// import ProductsLoadingScreen from "../components/constants/ProductsLoadingScreen";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div>
      <Image
        m="auto"
        src={`${CLOUDINARY_BASE_PATH}/bqa73jumv8l0gw0guw8y`}
        mb="20px"
        w="1220px"
      />
      <CategoryPoster />
      <Image
        m={"auto"}
        src={`${CLOUDINARY_BASE_PATH}/t1d6gkeaoqfywqdpqsqw`}
        mb={"40px"}
        mt={"40px"}
        w={"100%"}
        maxW={"1220"}
      />
      <Box w={"87%"} m={"auto"} mt={{ base: "30px", sm: "30px", md: "-25px" }}>
        <ProductHeader
          subTitle={`Showing ${1}-${1 + 9} out of 10000 products`}
          title="Products for you"
        />
        <Flex
          mt={{ base: "50px", sm: "50px", md: "20px" }}
          p={0}
          gap={4}
          w="100%"
          flexWrap="wrap"
        >
          <FilterSortMenu
            handleSort={() => {}}
            options={["price - low to high", "price - low to high"]}
            label={"Sort by"}
            value="Price"
          />
          <Flex flexGrow={1} w={"70%"} minH="100vh" flexWrap="wrap" gap={4}>
            {arr.map((item, i) => {
              return (
                <ProductCard
                  image="https://images.meesho.com/images/products/169486565/zoqdu_400.jpg"
                  key={i}
                  rating={5}
                  id={0}
                  price={500}
                  reviews={10}
                  title="new dressed product with price $500"
                />
              );
            })}
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
