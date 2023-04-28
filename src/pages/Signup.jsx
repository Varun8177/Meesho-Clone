import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import { OTPcontext } from "../context/OTPcontext";

export default function Signup() {
  const navigate = useNavigate();
  const { manageOTP } = useContext(OTPcontext);
  const toast = useToast();
  const otp = Math.random().toString().substr(2, 6);
  const [name, setname] = useState("");
  const [mobile, setMobile] = useState("");
  const bgColor = useColorModeValue("rgb(253, 237, 236)", "gray.800");
  function postReq(name, mobile) {
    axios
      .post("https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users", {
        name,
        mobile,
      })
      .then((res) => {
        localStorage.setItem("id", res.data.id);
      });
    // verifyUsers(name);
  }

  return (
    <Box bgColor={bgColor}>
      <Navbar />
      <Box p={"2%"} minH={"100vh"}>
        <Box
          w={{ base: "100%", md: "431px" }}
          border={"1px solid rgb(223, 223, 223)"}
          m={"auto"}
          borderRadius={"5px"}
          bgColor={"white"}
        >
          <Stack>
            <Image
              borderTopRadius={"5px"}
              w={"100%"}
              src="https://images.meesho.com/images/marketing/1661417516766.webp"
            />
          </Stack>
          {/* MObile Number */}
          <Stack
            mt={{ base: "10px", md: "20px" }}
            h={"308px"}
            p={"20px"}
            color="gray.700"
          >
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.700"
              textAlign={{ base: "center", md: "left" }}
              ml={{ md: "10px" }}
              mb={{ base: "10px", md: 0 }}
            >
              Sign Up to view your profile
            </Heading>

            <InputGroup>
              <InputLeftAddon
                children="Name"
                borderTop={"none"}
                borderLeft={"none"}
                borderRight={"none"}
                bgColor={"white"}
                borderRadius={"0"}
                mr={"10px"}
              />
              <Input
                placeholder="enter your name"
                borderTop={"none"}
                borderLeft={"none"}
                borderRight={"none"}
                borderRadius={"0"}
                borderBottomWidth={1}
                focusBorderColor={"white"}
                mb={"20px"}
                onChange={(e) => setname(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                children="In +91"
                borderTop={"none"}
                borderLeft={"none"}
                borderRight={"none"}
                bgColor={"white"}
                borderRadius={"0"}
                mr={"10px"}
              />
              <Input
                type="tel"
                placeholder="phone number"
                borderTop={"none"}
                borderLeft={"none"}
                borderRight={"none"}
                borderRadius={"0"}
                borderBottomWidth={1}
                focusBorderColor={"white"}
                placeholderTextColor={"gray.400"}
                mb={"20px"}
                isDisabled={mobile.length === 10}
                onChange={(e) => setMobile(e.target.value)}
              />
            </InputGroup>
            <Button
              textAlign={"center"}
              bgColor="rgb(244, 51, 151)"
              variant="outline"
              color={"white"}
              width={"100%"}
              _hover={{ bg: "rgb(199, 60, 157)" }}
              onClick={() => {
                toast(
                  {
                    title: "OTP sent on your mobile number",
                    description: `Please enter your otp to proceed ${otp}`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  },
                  postReq(name, mobile),
                  manageOTP(otp),
                  localStorage.setItem("login", true),
                  navigate("/otp-page")
                );
              }}
            >
              Send OTP
            </Button>
            <Text m={"auto"} color={"black"}>
              Already have an account? Login{" "}
              <Link style={{ color: "blue" }} to={"/login"}>
                here
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
