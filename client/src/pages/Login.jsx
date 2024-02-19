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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userActions";
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
    <Box minH={"100vh"} bgColor={"rgb(253, 237, 236)"} p={"2%"}>
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
          <Heading
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="gray.700"
            textAlign={{ base: "center", md: "left" }}
            ml={{ md: "10px" }}
            mb={{ base: "10px", md: 0 }}
          >
            Log in
          </Heading>
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
          <InputGroup>
            <InputLeftAddon
              children="IN +91"
              borderTop={"none"}
              borderLeft={"none"}
              borderRight={"none"}
              bgColor={"white"}
              borderRadius={"0"}
              mr={"10px"}
            />
            <Input
              isRequired
              type="number"
              value={mobile}
              placeholder="phone number"
              borderTop={"none"}
              borderLeft={"none"}
              borderRight={"none"}
              borderRadius={"0"}
              borderBottomWidth={1}
              focusBorderColor={"white"}
              onChange={(e) => setMobile(e.target.value)}
              isDisabled={mobile.length > 9}
            />
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
          >
            Send OTP
          </Button>
          <Text m={"auto"}>
            Don't have an account yet? Signup
            <Link style={{ color: "blue", marginLeft: "5px" }} to={"/sign-up"}>
              here
            </Link>
          </Text>
          <Text m={"auto"}>
            If you're an admin, click
            <Link
              style={{ color: "blue", marginLeft: "5px", marginRight: "5px" }}
              to={"/admin-login"}
            >
              here
            </Link>
            to login.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;