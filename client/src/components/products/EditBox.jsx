import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const EditBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [option, setOption] = useState("");
  return (
    <>
      <IconButton
        cursor={"pointer"}
        onClick={onOpen}
        color="GrayText"
        icon={<HiDotsVertical />}
        variant="ghost"
        _hover={{ bg: "none" }}
      />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent alignItems={"center"}>
          <ModalHeader>Choose an option</ModalHeader>
          <ModalCloseButton _hover={{ bgColor: "white" }} />
          <ModalBody>
            <Flex gap={"20px"} w={"400px"} my={"20px"} flexWrap={"wrap"}>
              <Button
                w="full"
                bgColor={"red.400"}
                _hover={{ bgColor: "red.400" }}
                color={"white"}
                onClick={() => setOption("Edit")}
              >
                edit
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button
                    w="full"
                    bgColor={"red.400"}
                    _hover={{ bgColor: "red.400" }}
                    color={"white"}
                  >
                    delete
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="semibold">
                    Confirmation
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Are you sure you want to continue with your action?
                  </PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button variant="outline">Cancel</Button>
                      <Button colorScheme="red">delete</Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBox;
