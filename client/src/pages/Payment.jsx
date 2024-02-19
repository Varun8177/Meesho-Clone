import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Captcha from "../components/payment/Captcha";
import PaymentMethod from "../components/payment/PaymentMethod";
import PriceDetails from "../components/payment/PriceDetails";
import ShippingAddress from "../components/payment/ShippingAddress";
import DeliveryAddress from "../components/payment/DeliveryAddress";
import UseResponseHandler from "../components/utils/UseResponseHandler";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getOrderDetails,
  updateOrderDetails,
} from "../redux/actions/orderActions";
import { useDispatch } from "react-redux";
import { clearCartData } from "../redux/actions/cartActions";

function generateCaptcha(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters.charAt(randomIndex);
  }

  return captcha;
}

const Payment = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const dispatch = useDispatch();
  const { handleResponse } = UseResponseHandler();
  const [text, setText] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNextTask = () => {
    updateOrderDetails(
      orderId,
      { checkedOut: true },
      dispatch,
      handleResponse,
      () => {
        setLoading(false);
        navigate("/");
      }
    );
  };

  useEffect(() => {
    setCaptcha(generateCaptcha(7));
    getOrderDetails(orderId, dispatch, handleResponse);
  }, [orderId]);

  return (
    <Box w={"80%"} mt={["50%", "40%", 0, 0, 0]} m={"auto"}>
      <Heading>Payment</Heading>
      <Flex
        mt={["50px", "50px", 0, 0, 0]}
        justifyContent={"space-between"}
        m={"auto"}
        direction={{ base: "column", lg: "row" }}
      >
        <Box
          w={["100%", "100%", "750px", "750px"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt={"20px"}
          p={"45px"}
          boxShadow="lg"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
        >
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Captcha captcha={captcha} />
            <PaymentMethod />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="6"
            as={"form"}
            onSubmit={(e) => {
              e.preventDefault();
              if (captcha === text) {
                //
                const { page } = location.state;
                if (page === "cart") {
                  clearCartData(handleResponse, handleNextTask);
                } else {
                  handleNextTask();
                }
              } else {
                handleResponse("please enter correct captcha", "", false);
              }
            }}
          >
            <Input
              placeholder="Enter the above Captcha"
              variant="outline"
              borderRadius="md"
              px="3"
              py="2"
              width="70%"
              _hover={{ borderColor: "gray.300" }}
              _focus={{
                borderColor: "green.400",
                boxShadow: "0 0 0 1px green.400",
              }}
              isRequired
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              colorScheme="pink"
              px="6"
              py="2"
              borderRadius="md"
              type="submit"
              isLoading={loading}
            >
              Proceed
            </Button>
          </Flex>
          <PriceDetails />
        </Box>
        <Box
          w={["100%", "100%", "450px", "450px"]}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt={"20px"}
          p={"20px"}
        >
          <Box mb={4}>
            <ShippingAddress />
            <DeliveryAddress />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Payment;
