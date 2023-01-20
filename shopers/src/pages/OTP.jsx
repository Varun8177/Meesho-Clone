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
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useState } from "react";

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
  const [timer, setTimer] = useState(false);
  const handleTimer = () => {
    setTimer(false);
  };
  let otp = "";
  // console.log(otp);
  useEffect(() => {
    console.log(otp);
  }, [otp]);
  return (
    <Box bgColor={"pink"} height={"635px"} mt={["-50px"]} p={"50px"}>
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
        <Stack mt={"20px"} h={"308px"} p={"20px"}>
          <Heading fontSize={"2xl"}>Enter OTP</Heading>
          <Text>Change Number</Text>
          <HStack m={"auto"}>
            <PinInput type="number">
              <PinInputField onChange={(e) => (otp += e.target.value)} />
              <PinInputField onChange={(e) => (otp += e.target.value)} />
              <PinInputField onChange={(e) => (otp += e.target.value)} />
              <PinInputField onChange={(e) => (otp += e.target.value)} />
              <PinInputField onChange={(e) => (otp += e.target.value)} />
              <PinInputField onChange={(e) => (otp += e.target.value)} />
            </PinInput>
          </HStack>
          <Button
            textAlign={"center"}
            bgColor="rgb(244, 51, 151)"
            variant="outline"
            color={"white"}
            width={"100%"}
            _hover={{ bg: "rgb(199, 60, 157)" }}
          >
            Verify
          </Button>
          {timer || (
            <Text
              color={"rgb(246, 93, 151)"}
              onClick={() => setTimer(!timer)}
              cursor={"pointer"}
              fontWeight={"bold"}
            >
              Resend OTP
            </Text>
          )}
          {timer && <Timer handleTimer={handleTimer} />}
        </Stack>
      </Box>
    </Box>
  );
}
