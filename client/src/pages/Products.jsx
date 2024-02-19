import { Box, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductHeader from "../components/products/ProductHeader";
import FilterSortMenu from "../components/products/FilterSortMenu";
import ProductCard from "../components/products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productsAction";
import ProductsLoadingScreen from "../components/constants/ProductsLoadingScreen";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const toast = useToast();
  const { products, loading } = useSelector((store) => store.productReducer);
  const [searchparams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const handleResponse = (title, description, status = false) => {
    toast.closeAll();
    toast({
      title,
      description,
      status: "error",
      position: "top-left",
    });
  };

  const handleSort = (val) => {
    searchparams.set("order", val);
    setSearchParams(searchparams);
  };

  useEffect(() => {
    const category = searchparams.get("category");
    const sort = searchparams.get("order");
    const options = {};
    if (category) options.category = category;
    if (sort) options.sort = sort;
    getProducts(handleResponse, dispatch, options);
  }, [searchparams]);

  return (
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
          handleClick={handleSort}
          options={[
            { label: "price - low to high", value: "asc" },
            { label: "price - High to low", value: "desc" },
          ]}
          label={"Sort by"}
          value="Price"
        />
        <Flex flexGrow={1} w={"70%"} minH="100vh" flexWrap="wrap" gap={4}>
          {loading
            ? arr.map((_, i) => <ProductsLoadingScreen key={i} />)
            : products?.map((product, i) => {
                return (
                  <ProductCard
                    image={product.image}
                    key={i}
                    rating={5}
                    id={product._id}
                    price={product.price}
                    reviews={10}
                    title={product.title}
                  />
                );
              })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Products;
