import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Show,
  Stack,
  Table,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaFemale,
  FaMale,
  FaChild,
  FaHome,
  FaHeart,
  FaRing,
  FaTv,
} from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";

import { ImMobile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import shoperzLogo from "../images/shoperzLogo.png";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import NavLinks from "./Navlinks";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { useContext, useRef } from "react";
import { SearchContext } from "../../context/searchContext";

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      cursor={"pointer"}
      w="fit-content"
      style={{ marginLeft: "12px" }}
    >
      {colorMode === "light" ? (
        <BsMoonStarsFill size="20px" />
      ) : (
        <BsSun size="20px" />
      )}
    </Button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { handleSearchValue, Searchvalue } = useContext(SearchContext);
  const { colorMode } = useColorMode();
  const login = localStorage.getItem("login");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const profileLink = {
    path: "/profile",
    title: "Profile",
    icon: <CgProfile />,
  };
  const cartLink = {
    path: "/cart",
    title: "Cart",
    icon: <AiOutlineShoppingCart />,
  };

  const signUpLink = { path: "/sign-up", title: "Sign-up" }; //icon: < />
  const loginLink = { path: "/login", title: "Login" }; //icon: <LockIcon />
  const btnRef = useRef();
  return (
    <Box
      w={"100%"}
      zIndex={"2"}
      h={{ base: "auto", lg: "126px" }}
      position={{ base: "sticky", md: "sticky", lg: "sticky" }}
      top={"0"}
      bgColor={colorMode === "light" ? "white" : "black"}
      mb={{ base: "5px", lg: "20px" }}
    >
      <Box
        color="white"
        h={"72px"}
        bgColor={colorMode === "light" ? "white" : "black"}
      >
        <Flex
          direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          w="87%"
          h={"72px"}
          m={"auto"}
          alignItems={"auto"}
          bgColor={colorMode === "light" ? "white" : "black"}
        >
          {/* Logo section & search bar */}
          <Flex
            width={{ base: "100%", sm: "100%", md: "80%", lg: "80%" }}
            bgColor={colorMode === "light" ? "white" : "black"}
            align={"center"}
          >
            <Show below="lg">
              <Flex align="center" justifyContent={"space-around"}>
                <Button
                  ref={btnRef}
                  bgColor="white"
                  onClick={onOpen}
                  cursor="pointer"
                  size="sm"
                  _hover={{ bg: "gray.100" }}
                  _active={{ bg: "gray.200" }}
                  _focus={{ outline: "none" }}
                >
                  <HamburgerIcon color="black" _hover={{ cursor: "pointer" }} />
                </Button>
                <Drawer
                  isOpen={isOpen}
                  placement="left"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent h={"100vh"} overflowY={"auto"}>
                    <DrawerCloseButton _hover={{ bg: "gray.200" }} />
                    <DrawerHeader
                      borderBottomWidth="1px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={shoperzLogo}
                        alt="logo"
                        height={"50px"}
                        w={"136px"}
                        onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                          });
                          handleSearchValue("");
                          navigate("/");
                        }}
                        cursor={"pointer"}
                      />
                    </DrawerHeader>

                    <DrawerBody p={"0"} pb={"5"} mt="auto" textAlign="center">
                      <Table
                        variant="simple"
                        pos={"sticky"}
                        top={"0"}
                        bgcolor="white"
                        zIndex={"3"}
                        mb={"10px"}
                      >
                        <Thead>
                          <Tr>
                            <Th textAlign="center" fontWeight="bold">
                              User Details
                            </Th>
                          </Tr>
                        </Thead>
                      </Table>
                      {login === "true" ? (
                        <>
                          <Flex
                            justifyContent={"space-between"}
                            w={"80%"}
                            m={"auto"}
                            mb={"10px"}
                            p={"1rem"}
                          >
                            <Button
                              key={profileLink.path}
                              variant="outline"
                              colorScheme="gray"
                              href={profileLink.path}
                              fontSize="md"
                              w={"45%"}
                              fontWeight="normal"
                              _hover={{ bg: "gray.200" }}
                              _focus={{ bg: "gray.200" }}
                              textAlign={"left"}
                              leftIcon={profileLink.icon}
                              onClick={() => {
                                navigate(profileLink.path);
                              }}
                            >
                              {profileLink.title}
                            </Button>
                            <Button
                              key={cartLink.path}
                              variant="outline"
                              colorScheme="gray"
                              fontSize="md"
                              fontWeight="normal"
                              _hover={{ bg: "gray.200" }}
                              _focus={{ bg: "gray.200" }}
                              textAlign={"left"}
                              w={"45%"}
                              leftIcon={cartLink.icon}
                              onClick={() => {
                                navigate(cartLink.path);
                              }}
                            >
                              {cartLink.title}
                            </Button>
                          </Flex>

                          <Flex
                            justifyContent={"space-between"}
                            w={"80%"}
                            m={"auto"}
                            mb={"10px"}
                            p={"1rem"}
                          >
                            <Button
                              key={"/feedback"}
                              variant="outline"
                              colorScheme="gray"
                              fontSize="md"
                              w={"45%"}
                              fontWeight="normal"
                              _hover={{ bg: "gray.200" }}
                              _focus={{ bg: "gray.200" }}
                              textAlign={"left"}
                              leftIcon={profileLink.icon}
                              onClick={() => {
                                navigate(profileLink.path);
                              }}
                            >
                              Feedback
                            </Button>
                            <Button
                              key={"/orders"}
                              variant="outline"
                              colorScheme="gray"
                              fontSize="md"
                              fontWeight="normal"
                              _hover={{ bg: "gray.200" }}
                              _focus={{ bg: "gray.200" }}
                              textAlign={"left"}
                              w={"45%"}
                              leftIcon={cartLink.icon}
                              onClick={() => {
                                navigate(cartLink.path);
                              }}
                            >
                              Orders
                            </Button>
                          </Flex>
                        </>
                      ) : (
                        <>
                          <Flex
                            justifyContent={"space-between"}
                            w={"80%"}
                            m={"auto"}
                            mb={"10px"}
                            p={"1rem"}
                          >
                            <Button
                              key={signUpLink.path}
                              variant="outline"
                              colorScheme="gray"
                              fontSize="md"
                              w={"45%"}
                              fontWeight="normal"
                              _hover={{ bg: "gray.200" }}
                              _focus={{ bg: "gray.200" }}
                              textAlign={"left"}
                              leftIcon={signUpLink.icon}
                              onClick={() => {
                                navigate(signUpLink.path);
                              }}
                            >
                              {signUpLink.title}
                            </Button>
                            <Button
                              key={loginLink.path}
                              variant="outline"
                              colorScheme="gray"
                              fontSize="md"
                              fontWeight="normal"
                              _hover={{ bg: "gray.200" }}
                              _focus={{ bg: "gray.200" }}
                              textAlign={"left"}
                              w={"45%"}
                              leftIcon={loginLink.icon}
                              onClick={() => {
                                navigate(loginLink.path);
                              }}
                            >
                              {loginLink.title}
                            </Button>
                          </Flex>
                        </>
                      )}
                      <Divider />
                      <Table
                        variant="simple"
                        pos={"sticky"}
                        top={"0"}
                        bgcolor="white"
                        zIndex={"3"}
                      >
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
                      {login === "true" ? (
                        <Button
                          w={"80%"}
                          m={"auto"}
                          bgColor={"pink.400"}
                          _hover={{
                            bg: "pink.500",
                          }}
                          cursor={"pointer"}
                          color={"white"}
                          onClick={() => {
                            localStorage.setItem("login", false);
                            navigate("/");
                          }}
                          alignSelf="end"
                          mt={"20px"}
                        >
                          Logout
                        </Button>
                      ) : null}
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Flex>
            </Show>
            <Show above="sm">
              <Image
                src={shoperzLogo}
                alt="logo"
                height={"50px"}
                w={"136px"}
                mt={"10px"}
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                  });
                  handleSearchValue("");
                  navigate("/");
                }}
                cursor={"pointer"}
              />
            </Show>
            <InputGroup
              ml={{ base: "0", md: "2%" }}
              mt={{ base: "5px", md: "0" }}
              alignItems={"center"}
            >
              <InputLeftElement
                pointerEvents="none"
                children={
                  <SearchIcon
                    mt={{ base: "5px", sm: "10px" }}
                    color="gray.300"
                  />
                }
              />
              <Input
                type={"search"}
                htmlSize={10}
                width={{
                  base: "100%",
                  lg: "300px",
                  xl: "400px",
                }}
                borderRadius={"5px"}
                h={{ base: "40px", sm: "45px" }}
                borderColor={"gray.300"}
                focusBorderColor={"gray.300"}
                placeholder={"Try Saree, Kurti, or search by product code"}
                _placeholder={{ color: "grey.200" }}
                value={Searchvalue}
                onChange={(e) => {
                  handleSearchValue(e.target.value);
                  navigate("/search-products");
                }}
                color={"black"}
              />
            </InputGroup>
          </Flex>

          {/* Download app...Etc */}
          <Show above="lg">
            <Flex
              color={colorMode === "light" ? "#333" : "#f5f5f5"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              width={{ base: "100%", sm: "100%", md: "50%", lg: "80%" }}
              bgColor={colorMode === "light" ? "white" : "black"}
            >
              <Show above="lg">
                <Box display={"flex"} alignItems={"center"} cursor={"pointer"}>
                  <ImMobile mt={"5px"} mr={"5px"} size="25px" />
                  Download App
                </Box>
                <Box
                  h={"100%"}
                  fontSize={"4xl"}
                  borderRight={"1px solid #ccc"}
                ></Box>
                <Show above="xl">
                  <Box cursor={"pointer"}>Become a Supplier</Box>
                  <Box
                    h={"100%"}
                    fontSize={"4xl"}
                    fontWeight={100}
                    borderRight={"1px solid #ccc"}
                  ></Box>
                </Show>
              </Show>
              {login === "true" ? (
                <Box
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => {
                    navigate("/profile");
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                >
                  <CgProfile style={{ marginLeft: "12px" }} size="20px" />
                  <Box>Profile</Box>
                </Box>
              ) : (
                <Box
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => {
                    navigate("/login");
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                >
                  Login
                </Box>
              )}
              {login === "true" ? (
                <Box
                  ml={"5px"}
                  cursor={"pointer"}
                  onClick={() => {
                    navigate("/cart");
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                >
                  <AiOutlineShoppingCart size="25px" />
                  <Box>Cart</Box>
                </Box>
              ) : (
                <Box
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => {
                    navigate("/sign-up");
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                >
                  Signup
                </Box>
              )}
              <ColorModeToggle />
            </Flex>
          </Show>
        </Flex>
      </Box>
      <Show above="lg">
        <Box
          w="100%"
          bgColor={colorMode === "light" ? "white" : "black"}
          color={colorMode === "light" ? "black" : "white"}
          borderTop={"1px solid rgb(223, 223, 223)"}
          borderBottom={"1px solid rgb(223, 223, 223)"}
        >
          <NavLinks />
        </Box>
      </Show>
    </Box>
  );
}
