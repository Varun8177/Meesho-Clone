import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { TotalContext } from "../../context/TotalContext";
import { Sidebar } from "./Sidebar";

import { Image, Stack, Text } from "@chakra-ui/react";
import Navbar from "../home/Navbar";
import { useState } from "react";
import { useEffect } from "react";

export function OrderItems({ title, images, price }) {
  const [time, setTime] = useState("");

  const [code, setCode] = useState("");
  useEffect(() => {
    const val = Math.random().toString().substr(2, 1);
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let arr = "qwertyuiopasdfghjklzxcvbnm";
    const otp = Math.random().toString().substr(2, 6);
    let captcha = otp.toString();
    captcha =
      num[captcha[0]] +
      arr[captcha[1]] +
      num[captcha[2]] +
      num[captcha[3]] +
      arr[captcha[4]];
    setCode(captcha);
    setTime(val);
  }, []);
  return (
    <Box
      w={["100%", "100%", "90%", "90%"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={"15px"}
      m={"auto"}
      mt={"30px"}
      bgColor={"white"}
    >
      <Flex align="center">
        <Image src={images} w={"100px"} />
        <Stack ml={"17px"} color="gray.600">
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {title}
          </Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {price}
          </Text>
          <Text fontSize={"md"}>{time} days estimated delivery time</Text>
          <Text fontSize={"md"}>
            Unique Code: {code}{" "}
            <Box as="span" fontSize={"sm"}>
              (Verify during delivery)
            </Box>
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}

export default function Orders() {
  const { orders } = useContext(TotalContext);
  return (
    <Box>
      <Navbar />
      <Box w={"70%"} margin={"auto"}>
        <Flex justifyContent={"space-between"} w={"100%"}>
          <Box w={"30%"} border={"1px solid rgb(223, 223, 223)"}>
            <Sidebar />
          </Box>
          <Box
            w={"67%"}
            border={"1px solid rgb(223, 223, 223)"}
            alignItems={"center"}
            bgColor={"#F1F1F1"}
            pt={"20px"}
            pb={"20px"}
            overflow={"scroll"}
            h={"80vh"}
          >
            {orders.length === 0 ? (
              <Box>
                <Image
                  src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1188.jpg?w=740&t=st=1674838461~exp=1674839061~hmac=e93ba9e31f1b7942c27b1f56a317715d72bd66a30a10f68043d8f1df7cd0ab25"
                  w={"500px"}
                  m={"auto"}
                  alignSelf={"center"}
                />
              </Box>
            ) : (
              orders.map((item) => {
                return <OrderItems {...item} />;
              })
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
