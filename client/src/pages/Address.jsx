import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UseResponseHandler from "../components/utils/UseResponseHandler";
import { getToken } from "../components/utils/getToken";
import { inputStyle } from "../components/utils/inputStyles";
import BackBtnWrapper from "../components/constants/BackBtn";

const baseurl = process.env.REACT_APP_BASE_URL;

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.userReducer);
  const [editContactDetails, setEditContactDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleResponse } = UseResponseHandler();
  const [addressData, setAddressData] = useState({
    house_no: "",
    area: "",
    pincode: "",
    city: "",
    country: "India",
    nearby_location: "",
    name: user?.name,
    mobile: user?.mobile,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseurl}/address`, addressData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      handleResponse("added address successfully", "", true);
      const { redirect } = location.state;
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/cart");
      }
    } catch (error) {
      if (error.response.data.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackBtnWrapper>
      <Center bg="rgb(253, 237, 236)" minH={"100vh"}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mt={"20px"}
          p={"45px"}
          bgColor={"white"}
        >
          <form onSubmit={handleSaveAddress}>
            <Flex>
              <Box>Contact Details</Box>
              <Button
                ml={"auto"}
                size="sm"
                variant="outline"
                _hover={{
                  borderColor: "grey.500",
                  color: "black",
                }}
                onClick={() =>
                  setAddressData({
                    ...addressData,
                    name: user?.name,
                    mobile: user?.mobile,
                  })
                }
              >
                Add Current Contact Info
              </Button>
              <Button
                ml={"auto"}
                size="sm"
                variant="outline"
                _hover={{
                  borderColor: "grey.500",
                  color: "black",
                }}
                onClick={() => setEditContactDetails(!editContactDetails)}
              >
                Edit
              </Button>
            </Flex>
            <FormControl isRequired>
              <Input
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
                name="name"
                {...inputStyle}
                disabled={!editContactDetails}
                value={addressData.name}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="number"
                placeholder="Phone Number"
                name="mobile"
                onChange={handleInputChange}
                disabled={!editContactDetails}
                {...inputStyle}
                value={addressData.mobile}
              />
            </FormControl>

            {/* Address input */}

            <Heading fontSize={"lg"} mb={"20px"}>
              <Flex>
                <Box>Address</Box>
              </Flex>
            </Heading>

            <FormControl isRequired>
              <Input
                type="text"
                name="house_no"
                placeholder="House no . / Building Name"
                value={addressData.house_no}
                onChange={handleInputChange}
                {...inputStyle}
                outline={"none"}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                name="area"
                type="text"
                placeholder="Road Name / area / colony"
                value={addressData.area}
                onChange={handleInputChange}
                {...inputStyle}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                name="pincode"
                type="number"
                placeholder="Pincode"
                value={addressData.pincode}
                onChange={handleInputChange}
                {...inputStyle}
              />
            </FormControl>
            <Flex justifyContent={"space-between"}>
              <FormControl isRequired>
                <Input
                  name="city"
                  width={"90%"}
                  placeholder="City"
                  value={addressData.city}
                  onChange={handleInputChange}
                  {...inputStyle}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  name="country"
                  width={"90%"}
                  placeholder="Country"
                  value={addressData.country}
                  onChange={handleInputChange}
                  {...inputStyle}
                  type="text"
                />
              </FormControl>
            </Flex>
            <FormControl>
              <Input
                name="nearby_location"
                type="text"
                placeholder="Nearby Location (optional)"
                value={addressData.nearby_location}
                onChange={handleInputChange}
                {...inputStyle}
              />
            </FormControl>
            <Button
              textAlign={"center"}
              bgColor="rgb(244, 51, 151)"
              variant="outline"
              color={"white"}
              width={"100%"}
              _hover={{ bg: "rgb(199, 60, 157)" }}
              type="submit"
              isLoading={loading}
            >
              Save Address And Continue
            </Button>
          </form>
        </Box>
      </Center>
    </BackBtnWrapper>
  );
};

export default Address;
