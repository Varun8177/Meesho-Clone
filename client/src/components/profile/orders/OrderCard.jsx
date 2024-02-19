import { Badge, Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddressCard from "../../cart/AddressCard";
import { FaCircleArrowRight } from "react-icons/fa6";
import MoreProductsOverlay from "./MoreProductsOverlay";
import OrderProductsDetails from "./OrderProductsDetails";

const OrderCard = ({ deliveryAddress, products, _id, createdAt }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex gap={"5px"}>
        <Badge variant="subtle" colorScheme="blue" mr={"5px"}>
          {new Date(createdAt).toLocaleDateString("en-US")}
        </Badge>
        <Badge variant="subtle" colorScheme="blue" mr={"5px"}>
          order id : {_id}
        </Badge>
      </Flex>
      <>
        <Flex
          align="center"
          mb="10px"
          bg="white"
          borderWidth="1px"
          p="5px"
          justify="space-between"
          cursor="pointer"
          onClick={onOpen}
        >
          <Box pos="relative">
            <Image src={products[0].image} w={"100px"} />
            {products.length > 1 && <MoreProductsOverlay />}
          </Box>
          <AddressCard {...deliveryAddress} OrderVersion />
          <FaCircleArrowRight size={20} />
        </Flex>

        <OrderProductsDetails
          isOpen={isOpen}
          onClose={onClose}
          deliveryAddress={deliveryAddress}
          products={products}
        />
      </>
    </>
  );
};

export default OrderCard;
