import { Box, Heading, Stack, Flex } from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CartItem from "../components/cartComponent/CartItem";
import CartSkeleton from "../components/cartComponent/CartSkeleton";
import Total from "../components/cartComponent/Total";

export default function Cart() {
  const [data, setData] = useState([]);
  const [totalprice, setTotal] = useState(0);
  const id = localStorage.getItem("id");
  const [load, setLoad] = useState(false);
  const arr = [1, 2, 3, 4];
  function deleteCartItem(id, itemId) {
    axios
      .delete(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart/${itemId}`
      )
      .then((res) => {
        getReq(id);
      });
  }

  function getReq(id) {
    setLoad(true);
    axios
      .get(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart`
      )
      .then((res) => {
        setData(res.data);
        setLoad(false);
      });
  }
  const HandleTotal = (val, qty) => {
    if (qty === 1) {
      setTotal((prev) => prev + val);
    } else {
      setTotal((prev) => prev - val);
    }
  };
  useEffect(() => {
    getReq(id);
  }, [id]);
  // for (let i = 0; i < data.length; i++) {
  //   let bag = "";
  //   for (let j = 1; j < data[i].price.length; j++) {
  //     bag += arr[i].price[j];
  //   }
  //   setTotal(totalprice + Number(bag));
  // }
  // console.log(data);
  return (
    <Box w={"70%"} mt={["50%", "40%", 0, 0, 0]} m={"auto"}>
      <Heading>Cart</Heading>
      <Flex
        mt={["50px", "50px", 0, 0, 0]}
        justifyContent={"space-between"}
        m={"auto"}
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
      >
        <Stack>
          {load
            ? arr.map((item) => {
                return <CartSkeleton />;
              })
            : data.map((item) => {
                return (
                  <CartItem
                    {...item}
                    HandleTotal={HandleTotal}
                    deleteCartItem={deleteCartItem}
                  />
                );
              })}
        </Stack>
        {/* <CartItem /> */}

        {/* Total */}

        <Total total={totalprice} />
      </Flex>
    </Box>
  );
}
