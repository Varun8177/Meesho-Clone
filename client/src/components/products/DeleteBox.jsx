import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseResponseHandler from "../utils/UseResponseHandler";
import { deleteProductRequest } from "../../redux/actions/productsAction";

const DeleteBox = ({ handleClose }) => {
  const { selectedProduct } = useSelector((state) => state.productReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { handleResponse } = UseResponseHandler();

  const handleNextAction = (success = false) => {
    setLoading(false);
    if (success) {
      handleClose();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteProductRequest(
      handleResponse,
      dispatch,
      selectedProduct.id,
      handleNextAction
    );
  };

  return (
    <>
      <Flex mb="10px" gap="10px">
        <Image src={selectedProduct.image} w={"100px"} />
        <Box>
          <Text fontSize="sm" color="gray.500" mb="2">
            {selectedProduct.title}
          </Text>
          <Text fontSize="sm" color="gray.500" mb="2">
            {selectedProduct.price} INR
          </Text>
          {selectedProduct.tag.map((item) => (
            <Badge
              variant="subtle"
              colorScheme="green"
              mr={"5px"}
              key={item + selectedProduct.id + Math.random(1)}
            >
              {item}
            </Badge>
          ))}
        </Box>
      </Flex>
      <form onSubmit={handleDelete}>
        <Checkbox isRequired my="10px">
          Are you sure you want to delete this product?
        </Checkbox>

        <Button
          colorScheme="red"
          type="submit"
          w="full"
          isLoading={loading}
          loadingText="deleting..."
        >
          Delete
        </Button>
      </form>
    </>
  );
};

export default DeleteBox;
