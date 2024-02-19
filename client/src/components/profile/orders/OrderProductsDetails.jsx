import {
  Badge,
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AddressCard from "../../cart/AddressCard";
import { useNavigate } from "react-router-dom";

const OrderProductsDetails = ({
  isOpen,
  onClose,
  deliveryAddress,
  products,
}) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minH="500px" maxH="500px" overflowY="auto">
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Products</Tab>
              <Tab>Address</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {products?.map((product) => (
                  <Flex
                    mb="10px"
                    gap="10px"
                    cursor="pointer"
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <Image src={product.image} w={"100px"} />
                    <Box>
                      <Text fontSize="sm" color="gray.500" mb="2">
                        {product.title}
                      </Text>
                      <Text fontSize="sm" color="gray.500" mb="2">
                        {product.price} INR
                      </Text>
                      <Badge variant="subtle" colorScheme="green" mr={"5px"}>
                        delevered
                      </Badge>
                    </Box>
                  </Flex>
                ))}
              </TabPanel>
              <TabPanel>
                <AddressCard {...deliveryAddress} OrderVersion />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderProductsDetails;
