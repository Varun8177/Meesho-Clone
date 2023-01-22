import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { ImMobile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import shoperzLogo from "../images/shoperzLogo.png";
import { SearchIcon } from "@chakra-ui/icons";
import NavLinks from "./Navlinks";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: "none" }}
      w="fit-content"
    >
      {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { handleSearchValue, Searchvalue } = useContext(SearchContext);
  const { colorMode } = useColorMode();
  const login = localStorage.getItem("login");
  return (
    <Box
      w={"100%"}
      zIndex={"2"}
      h={"126px"}
      position={{ base: "none", sm: "none", md: "sticky", lg: "sticky" }}
      top={"0"}
      bgColor={colorMode === "light" ? "white" : "black"}
      mb={{ base: "200px", sm: "170px", md: "20px", lg: "20px" }}
    >
      <Box
        color="white"
        h={{ base: "130px", sm: "130px", md: "72px", lg: "72px" }}
        bgColor={colorMode === "light" ? "white" : "black"}
      >
        <Flex
          direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          w="87%"
          // color="#333333"
          h={"72px"}
          m={"auto"}
          alignItems={"auto"}
          bgColor={colorMode === "light" ? "white" : "black"}
        >
          {/* Logo section & search bar */}
          <Flex
            width={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            bgColor={colorMode === "light" ? "white" : "black"}
          >
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
            />
            <InputGroup ml={"2%"} alignItems={"center"}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon mt={"30px"} color="gray.300" />}
              />
              <Input
                htmlSize={10}
                width={{ sm: "300px", md: "200px", lg: "300px", xl: "400px" }}
                borderRadius={"5px"}
                h={"45px"}
                border={"1px solid #000000"}
                placeholder={"Try Saree,Kurti or search by product code"}
                _placeholder={{ color: "pink.200" }}
                value={Searchvalue}
                onInput={(e) => {
                  handleSearchValue(e.target.value);
                  navigate("/search-products");
                }}
                color={"black"}
              />
            </InputGroup>
          </Flex>

          {/* Download app...Etc */}

          <Flex
            color={colorMode === "light" ? "black" : "white"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            width={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            bgColor={colorMode === "light" ? "white" : "black"}
          >
            <Box display={"flex"} alignItems={"center"} cursor={"pointer"}>
              <ImMobile mt={"5px"} mr={"5px"} size="25px" />
              Download App
            </Box>
            <Box
              h={"100%"}
              fontSize={"4xl"}
              borderRight={"1px solid grey"}
            ></Box>
            <Box cursor={"pointer"}>Become a Supplier</Box>
            <Box
              h={"100%"}
              fontSize={"4xl"}
              fontWeight={100}
              borderRight={"1px solid grey"}
            ></Box>
            <Box
              textAlign={"center"}
              cursor={"pointer"}
              onClick={() => {
                if (login === "true") {
                  navigate("/profile");
                  window.scroll({
                    top: 0,
                    left: 0,
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <CgProfile style={{ marginLeft: "12px" }} size="20px" />
              <Box>Profile</Box>
            </Box>
            <Box
              ml={"5px"}
              cursor={"pointer"}
              onClick={() => {
                if (login === "true") {
                  navigate("/cart");
                  window.scroll({
                    top: 0,
                    left: 0,
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <AiOutlineShoppingCart size="25px" />
              <Box>Cart</Box>
            </Box>
            <ColorModeToggle />
          </Flex>
        </Flex>
      </Box>
      <Box
        w="100%"
        h={{ base: "230px", sm: "230px", md: "52px", lg: "52px" }}
        bgColor={colorMode === "light" ? "white" : "black"}
        color={colorMode === "light" ? "black" : "white"}
        borderTop={"1px solid rgb(223, 223, 223)"}
        borderBottom={"1px solid rgb(223, 223, 223)"}
      >
        <NavLinks />
      </Box>
    </Box>
  );
}
