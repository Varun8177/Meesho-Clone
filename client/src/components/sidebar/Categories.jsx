import { Box, Button, Stack, Table, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import {
  FaFemale,
  FaRing,
  FaMale,
  FaChild,
  FaHome,
  FaHeart,
  FaTv,
} from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const links = [
    { path: "/women-ethnic", title: "Women Ethnic", icon: <FaFemale /> },
    { path: "/women-western", title: "Women Western", icon: <FaFemale /> },
    { path: "/men", title: "Men", icon: <FaMale /> },
    { path: "/kids", title: "Kids", icon: <FaChild /> },
    { path: "/home-&-kitchen", title: "Home & Kitchen", icon: <FaHome /> },
    { path: "/beauty-&-health", title: "Beauty & Health", icon: <FaHeart /> },
    {
      path: "/jewellery-&-accessories",
      title: "Jewellery & Accessories",
      icon: <FaRing />,
    },
    {
      path: "/bags-&-footwear",
      title: "Bags & Footwear",
      icon: <GiShoppingBag />,
    },
    { path: "/electronics", title: "Electronics", icon: <FaTv /> },
  ];
  return (
    <div>
      <Table variant="simple" bgcolor="white" zIndex={"3"}>
        <Thead>
          <Tr>
            <Th textAlign="center" fontWeight="bold">
              Categories
            </Th>
          </Tr>
        </Thead>
      </Table>
      <Stack spacing={5} textAlign="left">
        {links.map((link) => (
          <Box
            _hover={{ bg: "gray.200" }}
            w={"100%"}
            cursor={"pointer"}
            key={link.path}
          >
            <Button
              key={link.path}
              variant="ghost"
              fontSize="md"
              fontWeight="normal"
              _hover={{ bgColor: "none" }}
              textAlign="left"
              w={"fit-content"}
              leftIcon={link.icon}
              onClick={() => {
                navigate(link.path);
              }}
            >
              {link.title}
            </Button>
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default Categories;
