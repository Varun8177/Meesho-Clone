import {
  Button,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UseResponseHandler from "../utils/UseResponseHandler";
import axios from "axios";
import { getToken } from "../utils/getToken";
import AddressCard from "./AddressCard";
import { useNavigate } from "react-router-dom";
import CreateOrder from "./CreateOrder";
import EditAddress from "./EditAddress";
import { GrAddCircle } from "react-icons/gr";

const baseurl = process.env.REACT_APP_BASE_URL;
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const SelectAddress = ({ edit = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products, loading } = useSelector((store) => store.cartReducer);
  const [selected, setSelected] = useState("");
  const [addresses, setAddresses] = useState(null);
  const navigate = useNavigate();
  const [Addressloading, setLoading] = useState(false);
  const { handleResponse } = UseResponseHandler();

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

  const handleSelect = (val) => {
    setSelected(val);
  };

  useEffect(() => {
    getAddressData();
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        isDisabled={products?.length === 0 || loading}
        borderRadius={"5px"}
        width={"100%"}
        _hover={"rgb(255, 0, 0)"}
        bgColor={"rgb(244, 51, 151)"}
        color={"white"}
      >
        {edit ? "Edit" : "Checkout"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {addresses?.length !== 0 && <ModalHeader>Select Address</ModalHeader>}
          <ModalCloseButton />
          <ModalBody as={"div"} maxH={"500px"} minH="500px" overflowY={"auto"}>
            {Addressloading ? (
              "...loading"
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
          </ModalBody>

          {addresses?.length > 0 && (
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() =>
                  navigate("/address", {
                    state: { redirect: `/cart` },
                  })
                }
              >
                Add New Address
              </Button>
              {edit ? (
                <EditAddress selectedAddress={selected} />
              ) : (
                <CreateOrder selectedAddress={selected} />
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectAddress;
