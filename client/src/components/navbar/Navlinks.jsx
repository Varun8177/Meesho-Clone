import { Flex, Hide, Show } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styles from "./Navlink.module.css";

const Navlinks = () => {
  const XLlinks = [
    {
      path: "products/women-ethnic?category=WOMEN_ETHNIC",
      title: "Women Ethnic",
    },
    {
      path: "products/women-western?category=WOMEN_WESTERN",
      title: "Women Western",
    },
    { path: "products/men?category=MEN", title: "Men" },
    { path: "products/kids?category=KIDS", title: "Kids" },
    {
      path: "products/home-&-kitchen?category=HOME_AND_KITCHEN",
      title: "Home & Kitchen",
    },
    {
      path: "products/beauty-&-health?category=BEAUTY_AND_HEALTH",
      title: "Beauty & Health",
    },
    {
      path: "products/jewellery-&-accessories?category=JEWELLERY_AND_ACCESSORIES",
      title: "Jewellery & Accessories",
    },
    {
      path: "products/bags-&-footwear?category=BAGS_AND_FOOTWEAR",
      title: "Bags & Footwear",
    },
    { path: "products/electronics?category=ELECTRONICS", title: "Electronics" },
  ];
  const MDlinks = [
    {
      path: "products/women-ethnic?category=WOMEN_ETHNIC",
      title: "Women Ethnic",
    },
    {
      path: "products/women-western?category=WOMEN_WESTERN",
      title: "Women Western",
    },
    { path: "products/men?category=MEN", title: "Men" },
    { path: "products/kids?category=KIDS", title: "Kids" },
    {
      path: "products/home-&-kitchen?category=HOME_AND_KITCHEN",
      title: "Home & Kitchen",
    },
    {
      path: "products/beauty-&-health?category=BEAUTY_AND_HEALTH",
      title: "Beauty & Health",
    },
    { path: "products/electronics?category=ELECTRONICS", title: "Electronics" },
  ];
  return (
    <Flex
      justifyContent={"space-between"}
      height={"fit-content"}
      w={"87%"}
      h={"52px"}
      m={"auto"}
      alignItems={"center"}
      direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
    >
      <Show above="xl">
        {XLlinks.map((link) => {
          return (
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : styles.default;
              }}
              key={link.path}
              to={link.path}
            >
              {link.title}
            </NavLink>
          );
        })}
      </Show>
      <Hide above="xl">
        <Show above="md">
          {MDlinks.map((link) => {
            return (
              <NavLink
                className={({ isActive }) => {
                  return isActive ? styles.active : styles.default;
                }}
                key={link.path}
                to={link.path}
              >
                {link.title}
              </NavLink>
            );
          })}
        </Show>
      </Hide>
    </Flex>
  );
};

export default Navlinks;
