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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsFilter } from "react-icons/bs";
import { useSelector } from "react-redux";

const FilterBox = () => {
  const { filterOptions, loading } = useSelector(
    (store) => store.productReducer
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchparams, setSearchParams] = useSearchParams();
  const tags = searchparams.getAll("tag");
  const tag = searchparams.get("tag");
  const [selected, setSelected] = useState([]);

  const handleFilter = (val) => {
    const inValid = selected.includes(val);
    if (!inValid) {
      searchparams.append("tag", val);
      setSelected((prev) => [...prev, val]);
    } else {
      searchparams.delete("tag", val);
      setSelected((prev) => prev.filter((item) => item !== val));
    }
    setSearchParams(searchparams);
  };

  useEffect(() => {
    setSelected(tags);
  }, [tag]);

  return (
    <>
      <Box pos="relative">
        <Button
          variant={"outline"}
          cursor={"pointer"}
          onClick={onOpen}
          leftIcon={<BsFilter />}
          color={"GrayText"}
        >
          Filter
        </Button>
        {selected.length > 0 && (
          <Box
            bgColor="red.400"
            pos="absolute"
            top={-1}
            right={-1}
            rounded="full"
            color="white"
            fontSize="xx-small"
            fontWeight="bold"
            px="2"
            py={1}
          >
            {selected.length}
          </Box>
        )}
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent alignItems={"center"}>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton _hover={{ bgColor: "white" }} />
          <ModalBody>
            <Flex
              gap={"20px"}
              w={"400px"}
              mb={"20px"}
              flexWrap={"wrap"}
              justifyContent="center"
            >
              {filterOptions?.map((item, i) => (
                <Button
                  key={item}
                  variant={"outline"}
                  cursor={"pointer"}
                  bgColor={selected.includes(item) ? "red.400" : "blackAlpha"}
                  color={selected.includes(item) ? "white" : "GrayText"}
                  _hover={{
                    bgColor: selected.includes(item) ? "red.400" : "blackAlpha",
                    color: selected.includes(item) ? "white" : "GrayText",
                  }}
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </Button>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterBox;
