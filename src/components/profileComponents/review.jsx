import {
  Flex,
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Sidebar } from "./Sidebar";
import { Stack, useClipboard, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Navbar from "../home/Navbar";
import axios from "axios";
import { useState } from "react";

const confetti = {
  light: {
    primary: "4299E1", // blue.400
    secondary: "BEE3F8", // blue.100
  },

  dark: {
    primary: "1A365D", // blue.900
    secondary: "2A4365", // blue.800
  },
};

export function ContactFormWithSocialButtons() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setmessage] = useState("");
  const toast = useToast();
  const postReview = (e) => {
    e.preventDefault();
    if (email) {
      if (name) {
        if (message) {
          return axios.post(
            "https://63cd0ca00f1d5967f028fa8e.mockapi.io/Reviews",
            {
              email,
              name,
              message,
            }
          );
        }
      }
    }
  };
  return (
    <Box
      w={["100%", "100%", "90%", "70%"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={8}
      m="auto"
      mt={12}
      bgColor="#FFFFFF"
    >
      <form onSubmit={postReview}>
        <Flex flexDirection="column" alignItems="center">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel htmlFor="feedback">Feedback</FormLabel>
            <Textarea
              id="feedback"
              placeholder="Enter your feedback"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            w={"100%"}
            m={"auto"}
            mt={"20px"}
            bgColor={"pink.400"}
            _hover={{
              bg: "pink.500",
            }}
            cursor={"pointer"}
            color={"white"}
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
export default function Review() {
  return (
    <Box>
      <Navbar />
      <Box w={"70%"} margin={"auto"} h={"600px"}>
        <Flex justifyContent={"space-between"} w={"100%"}>
          <Box w={"30%"} border={"1px solid rgb(223, 223, 223)"}>
            <Sidebar />
          </Box>
          <Box
            w={"67%"}
            border={"1px solid rgb(223, 223, 223)"}
            alignItems={"center"}
            bgColor={"#F1F1F1"}
          >
            <ContactFormWithSocialButtons />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

// review
