import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";

const Options = ({ handleOption }) => {
  return (
    <Flex
      gap={"20px"}
      w={"400px"}
      my={"20px"}
      flexWrap={"wrap"}
      justify="center"
    >
      <Button
        variant={"outline"}
        cursor={"pointer"}
        leftIcon={<MdEditNote />}
        color={"GrayText"}
        onClick={() => handleOption("edit")}
      >
        Edit
      </Button>
      <Button
        variant={"outline"}
        cursor={"pointer"}
        leftIcon={<MdDeleteOutline />}
        color={"GrayText"}
        onClick={() => handleOption("delete")}
      >
        Delete
      </Button>
    </Flex>
  );
};

export default Options;
