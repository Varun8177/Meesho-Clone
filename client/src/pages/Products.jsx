import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductHeader from "../components/products/ProductHeader";
import ProductCard from "../components/products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productsAction";
import ProductsLoadingScreen from "../components/constants/ProductsLoadingScreen";
import { useSearchParams } from "react-router-dom";
import FilterBox from "../components/products/FilterBox";
import SortBox from "../components/products/SortBox";

const Products = () => {
  const toast = useToast();
  const { products, loading, totalProducts } = useSelector(
    (store) => store.productReducer
  );
  const [searchparams, setSearchparams] = useSearchParams();
  const category = searchparams.get("category");
  const sort = searchparams.get("order");
  const tag = searchparams.getAll("tag");
  const [page, setPage] = useState(Number(searchparams.get("page")) || 1);

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

  useEffect(() => {
    const controller = new AbortController();

    const options = {};
    if (category) options.category = category;
    if (sort) options.sort = sort;
    if (tag) options.tag = tag;

    getProducts(handleResponse, dispatch, options, controller.signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchparams]);

  return (
    <Box w={"87%"} m={"auto"}>
      <ProductHeader
        subTitle={`Showing ${page === 1 ? 1 : (page - 1) * 10 + 1}-${Math.min(
          page * 10,
          totalProducts
        )} out of ${totalProducts} products`}
        title="Products for you"
      />
      <Flex gap={4} mt="10px">
        <FilterBox />
        <SortBox />
        {sort || tag.length > 0 ? (
          <Button
            variant={"outline"}
            cursor={"pointer"}
            color={"GrayText"}
            onClick={() => {
              searchparams.delete("order");
              searchparams.delete("tag");
              setSearchparams(searchparams);
            }}
          >
            clear
          </Button>
        ) : null}
      </Flex>
      <Flex
        mt={{ base: "50px", sm: "50px", md: "20px" }}
        p={0}
        gap={4}
        w="100%"
        flexWrap="wrap"
      >
        <Flex flexGrow={1} justify="left" minH="100vh" flexWrap="wrap" gap={4}>
          {loading
            ? new Array(10)
                .fill(0)
                .map((_, i) => <ProductsLoadingScreen key={i} />)
            : products?.map((product, i) => {
                return (
                  <ProductCard
                    image={product.image}
                    key={i}
                    rating={product.rating}
                    id={product._id}
                    price={product.price}
                    reviews={product.reviews}
                    title={product.title}
                    tag={product.tag}
                  />
                );
              })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Products;
