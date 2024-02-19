import React, { useEffect, useState } from "react";

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
import { RxCaretSort } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

const SortBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchparams, setSearchParams] = useSearchParams();
  const order = searchparams.get("order");
  const [selected, setSelected] = useState(order, "");
  const handleSort = (val) => {
    if (!val) {
      searchparams.delete("order");
    } else {
      searchparams.set("order", val);
    }
    setSearchParams(searchparams);
  };
  useEffect(() => {
    if (order) {
      setSelected(order);
    } else {
      setSelected("");
    }
  }, [order]);
  return (
    <>
      <Button
        variant={"outline"}
        cursor={"pointer"}
        onClick={onOpen}
        leftIcon={<RxCaretSort />}
        color={"GrayText"}
      >
        sort
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent alignItems={"center"}>
          <ModalHeader>sort</ModalHeader>
          <ModalCloseButton _hover={{ bgColor: "white" }} />
          <ModalBody>
            <Text as={"b"} color={"GrayText"}>
              Price
            </Text>
            <Flex gap={"20px"} w={"400px"} my={"20px"} flexWrap={"wrap"}>
              {["asc", "desc"]?.map((item, i) => (
                <Button
                  key={item}
                  variant={"outline"}
                  cursor={"pointer"}
                  bgColor={selected === item ? "red.400" : "blackAlpha"}
                  color={selected === item ? "white" : "GrayText"}
                  _hover={{
                    bgColor: selected === item ? "red.400" : "blackAlpha",
                    color: selected === item ? "white" : "GrayText",
                  }}
                  onClick={() => {
                    setSelected(item);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Flex>
            <Button
              bgColor={"red.400"}
              _hover={{ bgColor: "red.400" }}
              color={"white"}
              onClick={() => {
                handleSort(selected);
                onClose();
              }}
            >
              apply
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SortBox;
