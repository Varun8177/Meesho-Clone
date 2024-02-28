import React, { useState } from "react";
import BackBtnWrapper from "../components/constants/BackBtn";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { inputStyle } from "../components/utils/inputStyles";
import { IoMdClose } from "react-icons/io";
import useImageUploader from "../components/hooks/useImageUploader";
import UseResponseHandler from "../components/utils/UseResponseHandler";
import { getToken } from "../components/utils/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseurl = process.env.REACT_APP_BASE_URL;
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const CreateProduct = () => {
  const [tag, setTag] = useState("");
  const [image, setImage] = useState(
    `${CLOUDINARY_BASE_PATH}/fva3knzalwep102vzard`
  );
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { handleResponse } = UseResponseHandler();
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState("No File Chosen");
  const { uploadImageToCloudinary } = useImageUploader();
  const [details, setDetails] = useState({
    title: "",
    price: "",
    image: null,
    tag: [],
    rating: 0,
    reviews: 0,
    category: "",
  });

  const handleAddTag = () => {
    if (/^[a-z]+$/.test(tag)) {
      setDetails({ ...details, tag: [tag, ...details.tag] });
      setTag("");
    } else {
      handleResponse(
        "",
        "tag should be lowercase and should not contain numbers"
      );
    }
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      setImage(URL.createObjectURL(selectedFile));
      setImageFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details.tag.length === 0) {
      handleResponse("please add atlease one tag", "");
      return;
    }
    if (!imageFile) {
      handleResponse("please add product image", "");
      return;
    }
    setLoading(true);
    const uploadedImage = await uploadImageToCloudinary(imageFile);

    try {
      const res = await axios.post(
        `${baseurl}/products`,
        {
          ...details,
          image: uploadedImage,
          rating: (Math.random() * (5 - 1) + 1).toFixed(1),
          reviews: Math.floor(Math.random() * 100),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      // navigate(`/product/${res.data._id}`);
    } catch (error) {
      if (error.response.data.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    } finally {
      setLoading(false);
      // setDetails({
      //   title: "",
      //   price: "",
      //   image: null,
      //   tag: [],
      //   rating: "4.8",
      //   reviews: "10",
      // });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <BackBtnWrapper>
      <Center minH={"100vh"} bg="rgb(253, 237, 236)" px="10px">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          bgColor={"white"}
          p={4}
          maxW="500px"
          w="full"
        >
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                placeholder="please enter a product name here"
                name="title"
                {...inputStyle}
                value={details.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="please enter a product name here"
                name="price"
                {...inputStyle}
                value={details.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <Select
                variant="flushed"
                mb="20px"
                placeholder="Select a category"
                _placeholder={{ color: "gray.400" }}
                onChange={(e) =>
                  setDetails({ ...details, category: e.target.value })
                }
              >
                <option value="WOMEN_ETHNIC">Women Ethnic</option>
                <option value="WOMEN_WESTERN">Women Western</option>
                <option value="MEN">Men</option>
                <option value="KIDS">Kids</option>
                <option value="HOME_AND_KITCHEN">Home and Kitchen</option>
                <option value="BEAUTY_AND_HEALTH">Beauty and Health</option>
                <option value="JEWELLERY_AND_ACCESSORIES">
                  Jewellery and Accessories
                </option>
                <option value="BAGS_AND_FOOTWEAR">Bags and Footwear</option>
                <option value="ELECTRONICS">Electronics</option>
              </Select>
            </FormControl>
            <Flex gap={2} mb="10px">
              <Input
                type="text"
                placeholder="please enter a tag here"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <Button
                colorScheme="blue"
                isDisabled={!tag || details.tag.includes(tag)}
                onClick={handleAddTag}
              >
                Add
              </Button>
            </Flex>

            {details.tag?.map((item, i) => (
              <Button
                colorScheme="green"
                mr={"5px"}
                key={tag + i}
                rightIcon={
                  <IoMdClose
                    onClick={() => {
                      setDetails({
                        ...details,
                        tag: details.tag.filter((tag) => tag !== item),
                      });
                    }}
                  />
                }
              >
                {item}
              </Button>
            ))}

            <input
              id="imageuploader2"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
            />
            <Flex gap={4} my="10px">
              <Image src={image} w="100px" h="100px" objectFit="contain" />
              <Box maxW="341px">
                <Text fontSize="small" mb="10px">
                  Please upload square image, size less than 100KB
                </Text>
                <label htmlFor="imageuploader2" style={{ cursor: "pointer" }}>
                  <Flex bg="#F8FCFF" p={2} rounded="md" gap={2} align="center">
                    <Text
                      px={4}
                      py={2}
                      border="2px solid #10B981"
                      color="#10B981"
                      rounded="md"
                      minW="fit-content"
                      fontWeight={500}
                    >
                      Choose File
                    </Text>
                    <Text w="fit-content" fontSize={"small"} noOfLines={1}>
                      {selectedFileName}
                    </Text>
                  </Flex>
                </label>
              </Box>
            </Flex>
            <Button
              textAlign="center"
              variant="outline"
              bgColor="rgb(244, 51, 151)"
              color={"white"}
              _hover={{ bg: "rgb(199, 60, 157)" }}
              w="full"
              type="submit"
              isLoading={loading}
            >
              Add product
            </Button>
          </form>
        </Box>
      </Center>
    </BackBtnWrapper>
  );
};

export default CreateProduct;
