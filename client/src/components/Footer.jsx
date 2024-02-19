import React from "react";
import {
  Container,
  SimpleGrid,
  Stack,
  Input,
  IconButton,
  useColorModeValue,
  useToast,
  Text,
} from "@chakra-ui/react";

import { BiMailSend } from "react-icons/bi";
import LogoSection from "./footer/LogoSection";
import LinkSection from "./footer/LinkSection";

const toastOptions = {
  duration: 2000,
  isClosable: true,
};

export default function Footer() {
  const toast = useToast();

  const handleSubscribe = () => {
    toast.closeAll();
    toast({
      title: "Successfully Subscribed",
      description: "You will start getting notifications from us",
      status: "success",
      ...toastOptions,
    });
  };

  return (
    <>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <LogoSection />
          <LinkSection />
          <Stack align={"flex-start"}>
            <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
              Stay up to date
            </Text>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                bg={useColorModeValue("pink.400", "green.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "pink.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
                onClick={handleSubscribe}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
