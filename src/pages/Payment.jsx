import { CheckCircleIcon } from "@chakra-ui/icons";
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
import axios from "axios";

export default function Payment() {
  const toast = useToast();
  const id = localStorage.getItem("id");
  const [value, setvalue] = useState("");
  const { totalcost } = useContext(TotalContext);
  const { address } = useContext(TotalContext);
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
  const handleCopy = (event) => {
    event.preventDefault();
  };

  function clearCart(id) {
    axios
      .get(
        `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart`
      )
      .then((res) => {
        const promises = res.data.map((item) => {
          return axios.delete(
            `https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}/cart/${item.id}`
          );
        });

        Promise.all(promises)
          .then(() => {
            console.log("Cart cleared successfully!");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box>
      <Navbar />
      <Box w={"80%"} mt={["50%", "40%", 0, 0, 0]} m={"auto"}>
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
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
          >
            <Flex w={"100%"} justifyContent={"space-between"}>
              {/* Captcha */}
              <Box
                bgColor="gray.100"
                px="4"
                py="2"
                mb="6"
                borderRadius="md"
                display="inline-block"
              >
                <Text fontWeight="semibold" display="inline">
                  Captcha:
                </Text>
                <Text
                  display="inline-block"
                  userSelect="none" // Disable text selection
                  onCopy={handleCopy}
                  px="2"
                  borderRadius="md"
                  bgColor="white"
                  boxShadow="md"
                  cursor="pointer"
                  ml={"10px"}
                >
                  {check}
                </Text>
              </Box>
              {/* Payment method */}
              <Box
                bgColor="gray.100"
                px="4"
                py="2"
                mb="6"
                borderRadius="md"
                display="inline-block"
              >
                <CheckCircleIcon mr="2" color="pink.400" />
                <Text fontWeight="semibold" display="inline">
                  Cash on Delivery
                </Text>
              </Box>
            </Flex>
            {/* Input and Button */}
            <Flex justifyContent="space-between" alignItems="center" mb="6">
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
                onChange={(e) => setvalue(e.target.value)}
              />
              <Button
                colorScheme="pink"
                px="6"
                py="2"
                borderRadius="md"
                onClick={() => {
                  if (value == check) {
                    toast({
                      title: "Successfully Purchased",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "top",
                    });
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                    clearCart(id);
                    navigate("/");
                  } else {
                    toast({
                      title: "Wrong Captcha",
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

            {/* Total Price */}
            <Box
              bgColor="gray.100"
              p="6"
              borderRadius="md"
              border="1px solid gray.200"
            >
              <Heading fontSize="md" mb="4" fontWeight="semibold">
                Price Details
              </Heading>
              <Flex justifyContent="space-between" alignItems="center">
                <Text>Total Product Price:</Text>
                <Text>{totalcost} INR</Text>
              </Flex>
              <hr />
              <Flex justifyContent="space-between" alignItems="center">
                <Heading fontSize="md">Order Total:</Heading>
                <Heading fontSize="md">{totalcost} INR</Heading>
              </Flex>
            </Box>
          </Box>
          <Box
            w={["100%", "100%", "450px", "450px"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={"20px"}
            p={"20px"}
          >
            {/* shipping address */}
            <Box mb={4}>
              <Heading fontSize="lg" mb={2} color="gray.600">
                Shipping Address
              </Heading>
              <Box mb={2}>
                <Heading fontSize="md" mb={1} color="gray.600">
                  Contact Details
                </Heading>
                <Text fontSize="md" mb={1} color="gray.600">
                  {address.name}
                </Text>
                <Text fontSize="md" mb={1} color="gray.600">
                  {address.mobile}
                </Text>
                <Button
                  variant="link"
                  colorScheme="pink"
                  size="sm"
                  onClick={() => {
                    navigate("/address");
                  }}
                >
                  Edit
                </Button>
              </Box>

              {/* billing address */}
              <Box>
                <Heading fontSize="md" mb={1} color="gray.600">
                  Delivery Address
                </Heading>
                <Text fontSize="md" mb={1} color="gray.600">
                  {address.area}
                </Text>
                <Text fontSize="md" mb={1} color="gray.600">
                  {address.house}
                </Text>
                <Text fontSize="md" mb={1} color="gray.600">
                  {address.city}, {address.pincode}
                </Text>
                <Text fontSize="md" mb={1} color="gray.600">
                  {address.country}
                </Text>
                <Button
                  variant="link"
                  colorScheme="pink"
                  size="sm"
                  onClick={() => {
                    navigate("/address");
                  }}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
