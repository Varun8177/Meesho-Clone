import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ImageContainer from "../components/single-product/ImageContainer";
import Description from "../components/single-product/Description";
import SizeSelector from "../components/single-product/SizeSelector";
import Details from "../components/single-product/Details";
import SoldBy from "../components/single-product/SoldBy";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/actions/productsAction";
import UseResponseHandler from "../components/utils/UseResponseHandler";

const SingleProduct = () => {
  const { productId } = useParams();
  const { loading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const { handleResponse } = UseResponseHandler();

  useEffect(() => {
    getSingleProduct(handleResponse, dispatch, productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <Box>
      {loading ? (
        <Flex h="70vh" alignItems="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          direction={["column", "row"]}
          w={{ base: "95%", xl: "80%" }}
          m={"auto"}
          justifyContent={{ base: "space-between", xl: "space-evenly" }}
          mb={"30px"}
          gap={{ base: "20px", md: "0" }}
        >
          <ImageContainer />
          <Box>
            <Description />
            <SizeSelector />
            <Details />
            <SoldBy />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default SingleProduct;
