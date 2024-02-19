import React, { useState } from "react";
import UseResponseHandler from "../utils/UseResponseHandler";
import { Button } from "@chakra-ui/react";
import { updateOrderDetails } from "../../redux/actions/orderActions";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const EditAddress = ({ selectedAddress }) => {
  const [loading, setLoading] = useState(false);
  const { handleResponse } = UseResponseHandler();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const dispatch = useDispatch();

  const handleLoading = (val) => {
    setLoading(val);
  };

  const EditOrderRequest = async () => {
    handleLoading(true);
    if (!selectedAddress) {
      handleResponse("Please select an address");
      setLoading(false);
      return;
    }
    const dataToSend = {
      deliveryAddress: selectedAddress,
    };

    updateOrderDetails(
      orderId,
      dataToSend,
      dispatch,
      handleResponse,
      handleLoading
    );
  };

  return (
    <Button
      variant="ghost"
      borderRadius={"5px"}
      _hover={"rgb(255, 0, 0)"}
      bgColor={"rgb(244, 51, 151)"}
      color={"white"}
      onClick={EditOrderRequest}
      isLoading={loading}
    >
      Edit
    </Button>
  );
};

export default EditAddress;
