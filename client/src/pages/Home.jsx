import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CategoryPoster from "../components/home/CategoryPoster";
import ProductsLoadingScreen from "../components/constants/ProductsLoadingScreen";
import axios from "axios";
import FilterSortMenu from "../components/products/FilterSortMenu";
import ProductHeader from "../components/products/ProductHeader";
import ProductCard from "../components/products/ProductCard";

const baseurl = process.env.REACT_APP_BASE_URL;
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getRandomData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/products/home/random`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomData();
  }, []);
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
        <Flex
          mt={{ base: "50px", sm: "50px", md: "20px" }}
          p={0}
          gap={4}
          w="100%"
          flexWrap="wrap"
        >
          <Flex
            flexGrow={1}
            minH="100vh"
            flexWrap="wrap"
            gap={4}
            justify="center"
          >
            {loading
              ? new Array(10).fill(0).map((item, i) => {
                  return <ProductsLoadingScreen key={i} />;
                })
              : data?.map((product, i) => {
                  return (
                    <ProductCard
                      image={product.image}
                      key={i}
                      rating={product.rating}
                      id={product._id}
                      price={product.price}
                      reviews={product.reviews}
                      title={product.title}
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
