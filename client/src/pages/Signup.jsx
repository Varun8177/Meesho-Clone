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
  useToast,
  Center,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/userActions";
import { inputStyle } from "../components/utils/inputStyles";
import BackBtnWrapper from "../components/constants/BackBtn";
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

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
    register({ mobile, name, email }, handleResponse);
  };

  return (
    <BackBtnWrapper>
      <Center minH={"100vh"} bgColor={"rgb(253, 237, 236)"}>
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
            <Stack p={"20px"} color="gray.700">
              <Box mb="20px">
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="gray.700"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Create Your Account
                </Heading>
                <Text color="GrayText" fontSize="small">
                  Start your journey with us by creating your account today.
                </Text>
              </Box>

              <InputGroup size="sm">
                <InputLeftAddon
                  children="Name"
                  {...inputStyle}
                  bg="white"
                  mr={"10px"}
                  mb={0}
                />
                <Input
                  placeholder="enter your name"
                  autoFocus
                  {...inputStyle}
                  mb={"20px"}
                  isRequired
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  children="In +91"
                  {...inputStyle}
                  bg="white"
                  mr={"10px"}
                  mb={0}
                />
                <Flex w="full" pos="relative">
                  <Input
                    type="number"
                    placeholder="phone number"
                    {...inputStyle}
                    mb={"20px"}
                    isRequired
                    value={mobile}
                    isDisabled={mobile.length === 10}
                    onChange={(e) => setMobile(e.target.value)}
                    size="small"
                  />
                  {mobile.length > 9 ? (
                    <Button
                      pos="absolute"
                      right={0}
                      top={0}
                      variant="solid"
                      colorScheme="pink"
                      w="fit-content"
                      onClick={() => setMobile("")}
                      size="small"
                      fontSize="x-small"
                      px="4"
                      py="2"
                    >
                      Change Number
                    </Button>
                  ) : null}
                </Flex>
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  children="Email"
                  {...inputStyle}
                  bg="white"
                  mr={"10px"}
                  mb={0}
                />
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...inputStyle}
                  mb={"20px"}
                  value={email}
                  isRequired
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <Button
                textAlign={"center"}
                colorScheme="pink"
                width={"100%"}
                type="submit"
                isLoading={loading}
                fontSize="small"
                _hover={{ bg: "rgb(199, 60, 157)" }}
                loadingText="sending otp..."
              >
                Send OTP
              </Button>
              <Text m={"auto"} color="GrayText" fontSize="small">
                Already have an account? Login{" "}
                <Link style={{ color: "blue" }} to={"/login"}>
                  here
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Center>
    </BackBtnWrapper>
  );
};

export default Signup;
