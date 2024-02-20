import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  PinInputField,
  PinInput,
  HStack,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyRegisterOtp,
  verifyloginOtp,
} from "../redux/actions/userActions";
import BackBtnWrapper from "../components/constants/BackBtn";

export function Timer({ handleTimer }) {
  const [count, setCount] = React.useState(59);
  React.useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const clear = () => {
      clearInterval(interval);
      handleTimer();
    };
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Text color={"rgb(166, 153, 153)"} fontWeight={"light"} fontSize={"sm"}>
        resend in {count} s
      </Text>
    </Box>
  );
}

export default function OTP() {
  const [isLoading, setIsloading] = useState(false);
  const [timer, setTimer] = useState(false);
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleTimer = () => {
    setTimer(false);
  };

  const handleResponse = (title, description, status = false) => {
    toast.closeAll();
    const { page } = location.state;
    if (status) {
      toast({
        title,
        description,
        status: "success",
        position: "top-left",
      });
      if (page === "login") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      toast({
        title,
        description,
        status: "error",
        position: "top-left",
      });
    }
    setIsloading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { page, mobile } = location.state;
    if (page === "login") {
      verifyloginOtp(+otp, mobile, dispatch, handleResponse);
    } else {
      verifyRegisterOtp(+otp, mobile, handleResponse);
    }
  };

  return (
    <BackBtnWrapper>
      <Center minH={"100vh"} bgColor={"rgb(253, 237, 236)"}>
        <Box>
          <Box
            w={"431px"}
            border={"1px solid rgb(223, 223, 223)"}
            m={"auto"}
            borderRadius={"5px"}
            bgColor={"white"}
          >
            <Stack>
              <Image
                borderTopRadius={"5px"}
                w={"431px"}
                src="https://images.meesho.com/images/marketing/1661417516766.webp"
              />
            </Stack>
            {/* MObile Number */}
            <Stack
              mt={"20px"}
              h={"308px"}
              p={"20px"}
              as="form"
              onSubmit={handleSubmit}
            >
              <Heading fontSize={"2xl"}>Enter OTP</Heading>

              <Text
                color={"rgb(166, 153, 153)"}
                fontWeight={"light"}
                fontSize={"sm"}
                cursor={"pointer"}
                onClick={() => {
                  const { page } = location.state;
                  if (page === "login") {
                    navigate("/login");
                  } else if (page === "register") {
                    navigate("/sign-up");
                  } else {
                    navigate("/");
                  }
                }}
              >
                Change email address
              </Text>

              <HStack m={"auto"}>
                <PinInput type="number" value={otp} onChange={setOtp}>
                  <PinInputField required />
                  <PinInputField required />
                  <PinInputField required />
                  <PinInputField required />
                  <PinInputField required />
                  <PinInputField required />
                </PinInput>
              </HStack>
              <Button
                textAlign={"center"}
                bgColor="rgb(244, 51, 151)"
                variant="outline"
                color={"white"}
                width={"100%"}
                _hover={{ bg: "rgb(199, 60, 157)" }}
                type="submit"
                isLoading={isLoading}
              >
                Verify
              </Button>
              {timer || (
                <Button
                  variant="solid"
                  bg="rgb(244, 51, 151)"
                  w="fit-content"
                  cursor={"pointer"}
                  color="white"
                  _hover={{ bg: "rgb(199, 60, 157)" }}
                  onClick={() => setTimer(true)}
                  isDisabled={timer}
                >
                  Resend OTP
                </Button>
              )}
              {timer && <Timer handleTimer={handleTimer} />}
            </Stack>
          </Box>
        </Box>
      </Center>
    </BackBtnWrapper>
  );
}
