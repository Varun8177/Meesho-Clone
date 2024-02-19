import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsFilter } from "react-icons/bs";

const FilterBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant={"outline"}
        cursor={"pointer"}
        onClick={onOpen}
        leftIcon={<BsFilter />}
        color={"GrayText"}
      >
        Filter
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent alignItems={"center"}>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton _hover={{ bgColor: "white" }} />
          <ModalBody>
            <Text as={"b"} color={"GrayText"}>
              Cuisines
            </Text>
            <Flex gap={"20px"} w={"400px"} mb={"20px"} flexWrap={"wrap"}>
              {[1, 2, 3, 4, 5]?.map((item, i) => (
                <Button
                  key={item}
                  variant={"outline"}
                  cursor={"pointer"}
                  color={"GrayText"}
                  bgColor={"blackAlpha"}
                >
                  {"item"}
                </Button>
              ))}
            </Flex>
            <Button
              bgColor={"red.400"}
              _hover={{ bgColor: "red.400" }}
              color={"white"}
            >
              Apply Filters
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterBox;
