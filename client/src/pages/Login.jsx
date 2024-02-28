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
import { login } from "../redux/actions/userActions";
import BackBtnWrapper from "../components/constants/BackBtn";
import { inputStyle } from "../components/utils/inputStyles";
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const CustomToast = (title, description, status = false) => {
    toast.closeAll();
    if (status) {
      toast({
        title,
        description,
        status: "success",
        position: "top-left",
      });
      navigate("/otp-verification", { state: { page: "login", mobile } });
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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    login(mobile, CustomToast);
  };

  return (
    <BackBtnWrapper>
      <Center minH={"100vh"} bg="rgb(253, 237, 236)">
        <Box
          w={{ base: "100%", md: "431px" }}
          m={"auto"}
          borderRadius={"5px"}
          bgColor={"white"}
        >
          <Stack>
            <Image
              borderTopRadius={"5px"}
              w={"100%"}
              src={`${CLOUDINARY_BASE_PATH}/jlbrk8sxkwjws4kl7iwl`}
            />
          </Stack>
          {/* Mobile Number */}
          <Stack
            mt={"20px"}
            h={"308px"}
            p={"20px"}
            as="form"
            onSubmit={handleLogin}
          >
            <Box mb="20px">
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="gray.700"
                textAlign={{ base: "center", md: "left" }}
              >
                Hello Again!
              </Heading>
              <Text color="GrayText" fontSize="small">
                welcome back
              </Text>
            </Box>
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
            <Button
              textAlign={"center"}
              bgColor="rgb(244, 51, 151)"
              variant="outline"
              color={"white"}
              width={"100%"}
              _hover={{ bg: "rgb(199, 60, 157)" }}
              type="submit"
              isLoading={loading}
              loadingText="sending otp..."
            >
              Send OTP
            </Button>
            <Text m={"auto"} color="GrayText" fontSize="small">
              Don't have an account yet? Signup
              <Link
                style={{ color: "blue", marginLeft: "5px" }}
                to={"/sign-up"}
              >
                here
              </Link>
            </Text>
          </Stack>
        </Box>
      </Center>
    </BackBtnWrapper>
  );
};

export default Login;
