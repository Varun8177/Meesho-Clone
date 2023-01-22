import { CheckCircleIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import { TotalContext } from "../context/TotalContext";

export default function Payment() {
  const toast = useToast();
  const [value, setvalue] = useState("");
  const { totalcost } = useContext(TotalContext);
  const navigate = useNavigate();
  const [check, setcheck] = useState("");
  useEffect(() => {
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
    setcheck(captcha);
  }, []);
  return (
    <Box>
      <Navbar />
      <Box w={"70%"} mt={["50%", "40%", 0, 0, 0]} m={"auto"}>
        <Heading>Payment</Heading>
        <Flex
          mt={["50px", "50px", 0, 0, 0]}
          justifyContent={"space-between"}
          m={"auto"}
          direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        >
          <Box
            w={["100%", "100%", "750px", "750px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            p={"45px"}
          >
            {/* contact Input */}
            <Heading
              fontSize={"lg"}
              mb={"20px"}
              bgColor={"green.200"}
              p={"10px"}
              borderRadius={"5px"}
              alignSelf={"center"}
            >
              <CheckCircleIcon /> Cash on Delevery
            </Heading>
            <Heading
              fontSize={"lg"}
              mb={"20px"}
              // bgColor={"red.200"}
              bgImage={
                "data:image/jpeg;base64,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"
              }
              p={"10px"}
              borderRadius={"5px"}
              alignSelf={"center"}
              w={"fit-content"}
            >
              Captcha: {check}
            </Heading>
            <Flex w={"300px"}>
              <Input
                placeholder="enter the above Captcha"
                onChange={(e) => {
                  setvalue(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  if (value == check) {
                    toast({
                      title: "Succesfully Purchased",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                      position: "top",
                    });
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                    navigate("/");
                  } else {
                    toast({
                      title: "wrong captcha",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                      position: "top",
                    });
                  }
                }}
              >
                Proceed
              </Button>
            </Flex>
          </Box>

          <Box
            w={["100%", "100%", "300px", "300px"]}
            borderWidth="1px"
            overflow="hidden"
            mt={"20px"}
            pb={"5"}
            borderLeft={"2px solid rgb(234, 239, 244)"}
          >
            <Box>
              <Box p="26px">
                <Heading fontSize={"xl"} color="rgb(102, 116, 142)">
                  Price Details
                </Heading>
              </Box>
              <Stack pl={"26px"} color="rgb(102, 116, 142)" pr={"20px"}>
                <Text>Total Product Price:{totalcost} INR</Text>
                <hr />

                <Heading fontSize={"xl"}>Order Total :{totalcost} INR </Heading>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
