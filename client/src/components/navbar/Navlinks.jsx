import { Flex, Hide, Show } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
const Navlinks = () => {
  const location = useLocation();
  const XLlinks = [
    {
      path: "products?category=WOMEN_ETHNIC",
      title: "Women Ethnic",
    },
    {
      path: "products?category=WOMEN_WESTERN",
      title: "Women Western",
    },
    { path: "products?category=MEN", title: "Men" },
    { path: "products?category=KIDS", title: "Kids" },
    {
      path: "products?category=HOME_AND_KITCHEN",
      title: "Home & Kitchen",
    },
    {
      path: "products?category=BEAUTY_AND_HEALTH",
      title: "Beauty & Health",
    },
    {
      path: "products?category=JEWELLERY_AND_ACCESSORIES",
      title: "Jewellery & Accessories",
    },
    {
      path: "products?category=BAGS_AND_FOOTWEAR",
      title: "Bags & Footwear",
    },
    { path: "products?category=ELECTRONICS", title: "Electronics" },
  ];
  const MDlinks = [
    {
      path: "products?category=WOMEN_ETHNIC",
      title: "Women Ethnic",
    },
    {
      path: "products?category=WOMEN_WESTERN",
      title: "Women Western",
    },
    { path: "products?category=MEN", title: "Men" },
    { path: "products?category=KIDS", title: "Kids" },
    {
      path: "products?category=HOME_AND_KITCHEN",
      title: "Home & Kitchen",
    },
    {
      path: "products?category=BEAUTY_AND_HEALTH",
      title: "Beauty & Health",
    },
    { path: "products?category=ELECTRONICS", title: "Electronics" },
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
            <ChakraLink
              as={ReactRouterLink}
              to={link.path}
              color={
                link.path.includes(location.search) &&
                location.pathname === "/products"
                  ? "rgb(244, 51, 151)"
                  : "black"
              }
              _hover={{ textDecorationLine: "none" }}
              key={link}
            >
              {link.title}
            </ChakraLink>
          );
        })}
      </Show>
      <Hide above="xl">
        <Show above="md">
          {MDlinks.map((link, index) => {
            return (
              <ChakraLink
                as={ReactRouterLink}
                to={link.path}
                color={
                  link.path.includes(location.search) &&
                  location.pathname === "/products"
                    ? "rgb(244, 51, 151)"
                    : "black"
                }
                _hover={{ textDecorationLine: "none" }}
                key={link + index}
              >
                {link.title}
              </ChakraLink>
            );
          })}
        </Show>
      </Hide>
    </Flex>
  );
};

export default Navlinks;
