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
      {/* Product */}
      <Flex>
        <Image src={images} w={"100px"} />
        <Flex w={"100%"} justifyContent={"space-between"}>
          <Stack ml={"17px"} color="rgb(102, 116, 142)">
            <Text>Title:{title}</Text>
            <Text>Size</Text>
            <Text>price :{price}</Text>
            <Text>Estimated Time : {time} days</Text>
            <Text>
              Unique Code : {code}{" "}
              <Box as="span" fontSize={"sm"}>
                (Verify yourself with this code during delevery)
              </Box>
            </Text>
          </Stack>
        </Flex>
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
            bgColor={"pink.200"}
            pt={"20px"}
            pb={"20px"}
          >
            {orders.map((item) => {
              return <OrderItems {...item} />;
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
