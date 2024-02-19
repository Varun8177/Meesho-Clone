import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/actions/orderActions";
import UseResponseHandler from "../utils/UseResponseHandler";
import { Box, Image } from "@chakra-ui/react";
import OrderCard from "./orders/OrderCard";

const Orders = () => {
  const { orders } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  const { handleResponse } = UseResponseHandler();
  useEffect(() => {
    getUserOrders(dispatch, handleResponse);
  }, []);

  return (
    <Box
      border={"1px solid rgb(223, 223, 223)"}
      alignItems={"center"}
      bgColor={"#F1F1F1"}
      pt={"20px"}
      pb={"20px"}
      overflow={"scroll"}
      h={"80vh"}
    >
      <Box
        w={["100%", "100%", "90%", "90%"]}
        borderRadius="lg"
        overflow="hidden"
        m={"auto"}
        mt={"30px"}
      >
        {orders?.length === 0 ? (
          <Box>
            <Image
              src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1188.jpg?w=740&t=st=1674838461~exp=1674839061~hmac=e93ba9e31f1b7942c27b1f56a317715d72bd66a30a10f68043d8f1df7cd0ab25"
              w="500px"
              h="500px"
              m="auto"
              alignSelf="center"
            />
          </Box>
        ) : (
          orders?.map((order) => {
            return <OrderCard {...order} key={order._id} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default Orders;
