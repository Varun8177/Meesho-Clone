import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseResponseHandler from "../utils/UseResponseHandler";
import { AddToCart } from "../../redux/actions/cartActions.js";
import { createUserOrders } from "../../redux/actions/orderActions.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/getToken.js";

const baseurl = process.env.REACT_APP_BASE_URL;

const ImageContainer = () => {
  const { singleProduct } = useSelector((state) => state.productReducer);
  const [cartLoading, setCartLoading] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const { handleResponse } = UseResponseHandler();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAddressData = async () => {
    setBuyNowLoading(true);
    try {
      const res = await axios.get(`${baseurl}/address`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { data } = res;
      if (data.length === 0) {
        navigate("/address", {
          state: { redirect: `/product/${singleProduct._id}` },
        });
      } else {
        const dataToSend = {
          products: [singleProduct._id],
          deliveryAddress: null,
          total: singleProduct.price,
        };
        createUserOrders(dataToSend, handleResponse, handleNavigation);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    } finally {
      setBuyNowLoading(false);
    }
  };

  const handleCartLoading = (val) => setCartLoading(val);

  const handleAddToCart = async () => {
    handleCartLoading(true);
    AddToCart(dispatch, singleProduct._id, handleCartLoading, handleResponse);
  };

  const handleNavigation = (id) => {
    setBuyNowLoading(false);
    if (id) {
      navigate(`/payment?orderId=${id}`, {
        state: { page: "product" },
      });
    }
  };

  const handleBuyNow = () => {
    getAddressData();
  };

  return (
    <Box
      border={"1px solid rgb(223, 223, 223)"}
      p={{ base: 0, md: "20px" }}
      height={"fit-content"}
      mt={["20px", "0px"]}
      borderRadius={"5px"}
    >
      <Image
        src={singleProduct?.image}
        m={"auto"}
        w={{ base: "300px", md: "70%", xl: "449px" }}
        objectFit={"contain"}
      />
      <Flex
        justifyContent={{ base: "space-evenly", md: "space-between" }}
        w={{ base: "90%", md: "80%", xl: "449px" }}
        my={{ base: "10px", md: "20px" }}
        m={{ base: "auto", md: "20px" }}
      >
        <Button
          borderRadius={"5px"}
          my="20px"
          w={{ base: "40%", md: "130px", xl: "202px" }}
          onClick={handleAddToCart}
          isLoading={cartLoading}
          isDisabled={singleProduct?.alreadyInCart}
        >
          {singleProduct?.alreadyInCart ? "Already in" : "Add to"} Cart
        </Button>
        <Button
          borderRadius={"5px"}
          mt={{ base: "20px" }}
          mb={{ base: "20px" }}
          w={{ base: "40%", md: "130px", xl: "202px" }}
          bgColor={"rgb(244, 51, 151)"}
          color={"white"}
          ml={{ md: "10px" }}
          onClick={handleBuyNow}
          isLoading={buyNowLoading}
        >
          <Box as="span" marginRight={"10px"} />
          Buy now
        </Button>
      </Flex>
    </Box>
  );
};

export default ImageContainer;
