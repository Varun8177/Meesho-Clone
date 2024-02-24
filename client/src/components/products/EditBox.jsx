import { Box, Button, Checkbox, Flex, Image, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { editProduct } from "../../redux/actions/productsAction";
import UseResponseHandler from "../utils/UseResponseHandler";

const EditBox = ({ handleClose }) => {
  const { selectedProduct } = useSelector((state) => state.productReducer);
  const [title, setTitle] = useState(selectedProduct.title);
  const [price, setPrice] = useState(selectedProduct.price);
  const [tags, setTags] = useState(selectedProduct.tag);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const { handleResponse } = UseResponseHandler();
  const [loading, setLoading] = useState(false);

  const handleNextAction = (success = false) => {
    setLoading(false);
    if (success) {
      handleClose();
    }
  };

  const handleAddTag = () => {
    setTags([tag, ...tags]);
    setShowTagInput(false);
    setTag("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editProduct(
      handleResponse,
      dispatch,
      selectedProduct.id,
      {
        title,
        price,
        tag: tags,
      },
      handleNextAction
    );
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Flex mb="10px" gap="10px">
          <Image src={selectedProduct.image} w={"100px"} />
          <Box>
            <Input
              value={title}
              fontSize="sm"
              color="gray.500"
              mb="2"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="please enter the product name here"
            />
            <Input
              value={price}
              fontSize="sm"
              color="gray.500"
              mb="2"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="please enter the product price here"
            />
            {showTagInput ? (
              <Flex gap={2}>
                <Input
                  type="text"
                  placeholder="please type a tag here"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  isDisabled={!tag || tags.includes(tag)}
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </Flex>
            ) : (
              <Button
                leftIcon={<FaPlus />}
                variant="outline"
                onClick={() => setShowTagInput(true)}
              >
                Add Tag
              </Button>
            )}
          </Box>
        </Flex>
        {tags?.map((item) => (
          <Button
            colorScheme="green"
            mr={"5px"}
            key={item + selectedProduct.id + Math.random(1)}
            rightIcon={
              tags.length > 1 && (
                <IoMdClose
                  onClick={() => {
                    if (tags.length > 1) {
                      setTags(tags.filter((tag) => tag !== item));
                    }
                  }}
                />
              )
            }
          >
            {item}
          </Button>
        ))}
        <Checkbox isRequired my="10px">
          I accept the terms and conditions for editing this product
        </Checkbox>

        <Button
          colorScheme="blue"
          type="submit"
          w="full"
          fontSize="smaller"
          isLoading={loading}
          loadingText="saving..."
          isDisabled={
            title === selectedProduct.title &&
            price === selectedProduct.price &&
            JSON.stringify(tags) === JSON.stringify(selectedProduct.tag)
          }
        >
          save
        </Button>
      </form>
    </>
  );
};

export default EditBox;
