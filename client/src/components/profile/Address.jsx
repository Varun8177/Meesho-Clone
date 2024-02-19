import axios from "axios";
import React, { useEffect, useState } from "react";
import UseResponseHandler from "../utils/UseResponseHandler";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import AddressCard from "../cart/AddressCard";
import { useNavigate } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { getToken } from "../utils/getToken";

const baseurl = process.env.REACT_APP_BASE_URL;
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const Address = () => {
  const [addresses, setAddresses] = useState(null);
  const { handleResponse } = UseResponseHandler();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleSelect = (val) => {
    setSelected(val);
  };

  const getAddressData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/address`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { data } = res;
      setAddresses(data);
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

  useEffect(() => {
    getAddressData();
  }, []);

  return (
    <Stack
      align="center"
      justify="center"
      border={"1px solid rgb(223, 223, 223)"}
      bgColor={"#F1F1F1"}
      pt={"20px"}
      pb={"20px"}
      overflow={"scroll"}
      h={"80vh"}
      pos="relative"
    >
      {loading ? (
        <Flex>
          <Spinner />
        </Flex>
      ) : addresses?.length === 0 ? (
        <Flex
          w="full"
          h="100%"
          align="center"
          justify="center"
          flexDir="column"
        >
          <Image
            src={`${CLOUDINARY_BASE_PATH}/p7mhubrdosrlejztrgay`}
            h="300px"
          />
          <Flex
            w={"250px"}
            h={"100px"}
            fontWeight={400}
            border={"2px dotted pink"}
            alignItems={"center"}
            justifyContent={"center"}
            rounded={"10px"}
            direction={"column"}
            cursor={"pointer"}
            _hover={{ bgColor: "#e8e8e8" }}
            onClick={() =>
              navigate("/address", {
                state: { redirect: `/cart` },
              })
            }
          >
            <IconButton
              bg={"transparent"}
              size={"md"}
              icon={<GrAddCircle size={30} />}
              _hover={{ bg: "transparent" }}
            />
            <Text as={"b"}>Add Address</Text>
          </Flex>
        </Flex>
      ) : (
        addresses?.map((address) => {
          return (
            <AddressCard
              key={address._id}
              {...address}
              isSelected={selected === address._id}
              handleSelect={handleSelect}
            />
          );
        })
      )}
      <Flex pos="absolute" bottom={0} bg="white" w="100%" p={4} justify="end">
        <Button
          colorScheme="blue"
          mr={3}
          onClick={() =>
            navigate("/address", {
              state: { redirect: `/profile?type=address` },
            })
          }
        >
          Add New Address
        </Button>
      </Flex>
    </Stack>
  );
};

export default Address;
