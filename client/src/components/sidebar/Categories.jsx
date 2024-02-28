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
    {
      path: "/products?category=WOMEN_ETHNIC",
      title: "Women Ethnic",
      icon: <FaFemale />,
    },
    {
      path: "/products?category=WOMEN_WESTERN",
      title: "Women Western",
      icon: <FaFemale />,
    },
    { path: "/products?category=MEN", title: "Men", icon: <FaMale /> },
    { path: "/products?category=KIDS", title: "Kids", icon: <FaChild /> },
    {
      path: "/products?category=HOME_AND_KITCHEN",
      title: "Home & Kitchen",
      icon: <FaHome />,
    },
    {
      path: "/products?category=BEAUTY_AND_HEALTH",
      title: "Beauty & Health",
      icon: <FaHeart />,
    },
    {
      path: "/products?category=JEWELLERY_AND_ACCESSORIES",
      title: "Jewellery & Accessories",
      icon: <FaRing />,
    },
    {
      path: "/products?category=BAGS_AND_FOOTWEAR",
      title: "Bags & Footwear",
      icon: <GiShoppingBag />,
    },
    {
      path: "/products?category=ELECTRONICS",
      title: "Electronics",
      icon: <FaTv />,
    },
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
        {links.map((link, index) => (
          <Box
            _hover={{ bg: "gray.200" }}
            w={"100%"}
            cursor={"pointer"}
            key={link.path + index + link.title}
            onClick={() => {
              navigate(link.path);
            }}
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
