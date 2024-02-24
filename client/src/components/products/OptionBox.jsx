import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TiArrowBack } from "react-icons/ti";
import Options from "./Options";
import EditBox from "./EditBox";
import DeleteBox from "./DeleteBox";
import { useDispatch } from "react-redux";
import { updateSelectedProduct } from "../../redux/slices/productSlice";

const OptionBox = ({ id, image, title, price, tag = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [option, setOption] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOption("");
    onClose();
  };

  const handleOption = (val) => setOption(val);
  return (
    <>
      <IconButton
        onClick={() => {
          dispatch(updateSelectedProduct({ id, image, title, price, tag }));
          onOpen();
        }}
        icon={<HiOutlineDotsHorizontal />}
        variant="ghost"
        _hover={{ bg: "none" }}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setOption("");
          onClose();
        }}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent alignItems={"center"}>
          <Flex w="full" alignItems="center">
            {option !== "" && (
              <TiArrowBack
                size={25}
                style={{ marginLeft: "10px" }}
                onClick={() => setOption("")}
                cursor="pointer"
              />
            )}
            <ModalHeader minW="fit-content" flexGrow={1} textAlign="center">
              {option === "edit"
                ? "Edit"
                : option === "delete"
                ? "Confirmation"
                : "Choose an option"}
            </ModalHeader>
            <ModalCloseButton _hover={{ bgColor: "white" }} />
          </Flex>

          <ModalBody>
            {option === "edit" ? (
              <EditBox handleClose={handleClose} />
            ) : option === "delete" ? (
              <DeleteBox handleClose={handleClose} />
            ) : (
              <Options handleOption={handleOption} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OptionBox;
