import React, { useState } from "react";
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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/userActions";
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("rgb(253, 237, 236)", "gray.800");

  const handleResponse = (title, description, status = false) => {
    toast.closeAll();
    if (status) {
      toast({
        title,
        description,
        status: "success",
        position: "top-left",
      });
      navigate("/otp-verification", { state: { page: "register", mobile } });
    } else {
      toast({
        title,
        description,
        status: "error",
        position: "top-left",
      });
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    register({ mobile, name }, handleResponse);
  };

  return (
    <Box bgColor={bgColor}>
      <Box p={"2%"} minH={"100vh"}>
        <Box
          w={{ base: "100%", md: "431px" }}
          border={"1px solid rgb(223, 223, 223)"}
          m={"auto"}
          borderRadius={"5px"}
          bgColor={"white"}
        >
          <form onSubmit={handleSubmit}>
            <Stack>
              <Image
                borderTopRadius={"5px"}
                w={"100%"}
                src={`${CLOUDINARY_BASE_PATH}/jlbrk8sxkwjws4kl7iwl`}
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
                  isRequired
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  _placeholder={{ color: "gray.400" }}
                  mb={"20px"}
                  value={mobile}
                  isRequired
                  isDisabled={mobile.length === 10}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </InputGroup>
              {mobile.length > 9 && (
                <Text
                  color={"rgb(166, 153, 153)"}
                  fontWeight={"light"}
                  fontSize={"sm"}
                  cursor={"pointer"}
                  onClick={() => setMobile("")}
                >
                  Change Number
                </Text>
              )}
              <Button
                textAlign={"center"}
                bgColor="rgb(244, 51, 151)"
                variant="outline"
                color={"white"}
                width={"100%"}
                type="submit"
                isLoading={loading}
                _hover={{ bg: "rgb(199, 60, 157)" }}
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
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
