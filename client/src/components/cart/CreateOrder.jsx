import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import UseResponseHandler from "../utils/UseResponseHandler";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserOrders } from "../../redux/actions/orderActions";

const CreateOrder = ({ selectedAddress }) => {
  const [loading, setLoading] = useState(false);
  const { handleResponse } = UseResponseHandler();
  const navigate = useNavigate();
  const { products, total } = useSelector((store) => store.cartReducer);

  const handleNavigation = (id) => {
    setLoading(false);
    if (id) {
      navigate(`/payment?orderId=${id}`, {
        state: { page: "cart" },
      });
    }
  };

  const CreateOrderRequest = async () => {
    setLoading(true);
    if (!selectedAddress) {
      handleResponse("Please select an address");
      setLoading(false);
      return;
    }

    const dataToSend = {
      products: products.map((item) => item.productId),
      deliveryAddress: selectedAddress,
      total,
    };

    createUserOrders(dataToSend, handleResponse, handleNavigation);
  };

  return (
    <Button
      variant="ghost"
      borderRadius={"5px"}
      _hover={"rgb(255, 0, 0)"}
      bgColor={"rgb(244, 51, 151)"}
      color={"white"}
      onClick={CreateOrderRequest}
      isLoading={loading}
    >
      Checkout
    </Button>
  );
};

export default CreateOrder;
