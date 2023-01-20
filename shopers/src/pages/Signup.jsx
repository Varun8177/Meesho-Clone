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
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const otp = Math.random().toString().substr(2, 6);
  return (
    <Box bgColor={"pink"} height={"635px"} mt={"-50px"} p={"50px"}>
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
          <Heading fontSize={"2xl"}>Sign Up to view your profile</Heading>
          <Text>Country</Text>
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
              type="tel"
              placeholder="phone number"
              borderTop={"none"}
              borderLeft={"none"}
              borderRight={"none"}
              borderRadius={"0"}
              borderBottom={"3px solid rgb(223, 223, 223)"}
              focusBorderColor={"white"}
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
                navigate("/otp-page")
              );
            }}
          >
            Send OTP
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
