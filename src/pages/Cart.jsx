import { Box, Heading, Stack, Flex, Text } from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import CartItem from "../components/cartComponent/CartItem";
import CartSkeleton from "../components/cartComponent/CartSkeleton";
import Total from "../components/cartComponent/Total";
import Navbar from "../components/home/Navbar";
import { TotalContext } from "../context/TotalContext";

export default function Cart() {
  const { handleTotalCost } = useContext(TotalContext);
  const [data, setData] = useState([]);
  const [totalprice, setTotal] = useState(0);
  const id = localStorage.getItem("id");
  const [load, setLoad] = useState(false);
  const [size, setSize] = useState("");

  const arr = [1, 2, 3, 4];

  function removeTunics(str) {
    let originalStr = str;
    let updatedStr = originalStr.replace("&amp; Tunics", "");
    updatedStr = originalStr.replace("&amp; Dresses", "");
    return updatedStr;
  }

  function deleteCartItem(id, itemId, qty, price) {
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
        const updatedData = res.data.map((item) => {
          let updatedTitle = removeTunics(item.title);
          console.log(item.title, updatedTitle);
          return {
            ...item,
            title: updatedTitle,
          };
        });

        console.log(updatedData);
        setData(updatedData);
        setLoad(false);
      });
  }
  const HandleTotal = (val, qty) => {
    if (qty === 1) {
      setTotal((prev) => prev + val);
      handleTotalCost(totalprice);
    } else {
      setTotal((prev) => prev - val);
      handleTotalCost(totalprice);
    }
  };
  useEffect(() => {
    getReq(id);
    let x = localStorage.getItem("size");
    setSize(x);
  }, [id]);

  return (
    <Box>
      <Navbar />
      <Box w={"70%"} mt={["50%", "40%", 0, 0, 0]} m={"auto"}>
        <Heading>Cart</Heading>
        <Text>{data.length} items in your cart</Text>
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
                      size={size}
                    />
                  );
                })}
          </Stack>
          <Total total={totalprice} data={data} />
        </Flex>
      </Box>
    </Box>
  );
}
