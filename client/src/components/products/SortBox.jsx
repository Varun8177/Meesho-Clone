import React, { useEffect, useState } from "react";

import {
  Box,
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
  const [selected, setSelected] = useState(order || "");

  const handleSort = (val) => {
    if (!val) {
      setSelected("");
      searchparams.delete("order");
    } else {
      setSelected(val);
      searchparams.set("order", val);
    }
    onClose();
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
      <Box pos="relative">
        <Button
          variant={"outline"}
          cursor={"pointer"}
          onClick={onOpen}
          leftIcon={<RxCaretSort />}
          color={"GrayText"}
        >
          sort
        </Button>
        {selected && (
          <Box
            bgColor="red.400"
            pos="absolute"
            top={-1}
            right={-1}
            rounded="full"
            color="white"
            fontSize="xx-small"
            fontWeight="bold"
            p="2"
          />
        )}
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent alignItems={"center"}>
          <ModalHeader>SORT BY PRICE</ModalHeader>
          <ModalCloseButton _hover={{ bgColor: "white" }} />
          <ModalBody>
            <Flex
              gap={"20px"}
              w={"400px"}
              my={"20px"}
              flexWrap={"wrap"}
              justify="center"
            >
              {[
                { name: "price - low to high", value: "asc" },
                { name: "price - high to low", value: "desc" },
              ]?.map((item, i) => (
                <Button
                  key={item}
                  variant={"outline"}
                  cursor={"pointer"}
                  bgColor={selected === item.value ? "red.400" : "blackAlpha"}
                  color={selected === item.value ? "white" : "GrayText"}
                  _hover={{
                    bgColor: selected === item.value ? "red.400" : "blackAlpha",
                    color: selected === item.value ? "white" : "GrayText",
                  }}
                  onClick={() => {
                    handleSort(item.value);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SortBox;
