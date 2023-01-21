import {
  Flex,
  Box,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Sidebar } from "./Sidebar";

export default function Review() {
  return (
    <Box w={"70%"} margin={"auto"} h={"600px"}>
      <Flex justifyContent={"space-between"} w={"100%"}>
        <Box w={"30%"} border={"1px solid rgb(223, 223, 223)"}>
          <Sidebar />
        </Box>
        <Box
          w={"67%"}
          border={"1px solid rgb(223, 223, 223)"}
          alignItems={"center"}
        >
          <Flex>
            <Box
              bg="pink.400"
              height={"500px"}
              alignItems={"center"}
              color="white"
              borderRadius="lg"
              w={"80%"}
              m={{ sm: 4, md: 16, lg: 10 }}
              p={{ sm: 5, md: 5, lg: "16px 20px 16px 20px" }}
            >
              <Box p={4}>
                <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                  <WrapItem>
                    <Box bg="white" borderRadius="lg" p={"10px"}>
                      <Box m={8} color="#0B0E3F">
                        <VStack spacing={5}>
                          <FormControl id="name">
                            <FormLabel>Your Name</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement
                                pointerEvents="none"
                                children={<BsPerson color="gray.800" />}
                              />
                              <Input type="text" size="md" />
                            </InputGroup>
                          </FormControl>
                          <FormControl id="name">
                            <FormLabel>Mail</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement
                                pointerEvents="none"
                                children={<MdOutlineEmail color="gray.800" />}
                              />
                              <Input type="text" size="md" />
                            </InputGroup>
                          </FormControl>
                          <FormControl id="name">
                            <FormLabel>Message</FormLabel>
                            <Textarea
                              borderColor="gray.300"
                              _hover={{
                                borderRadius: "gray.300",
                              }}
                              placeholder="message"
                            />
                          </FormControl>
                          <FormControl id="name" float="right">
                            <Button
                              variant="solid"
                              bg="pink.400"
                              color="white"
                              _hover={{
                                bg: "pink.400",
                              }}
                            >
                              Send Message
                            </Button>
                          </FormControl>
                        </VStack>
                      </Box>
                    </Box>
                  </WrapItem>
                </Wrap>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// review
