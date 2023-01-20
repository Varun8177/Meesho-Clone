import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ImMobile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import shoperzLogo from "../images/shoperzLogo.png";
import { SearchIcon } from "@chakra-ui/icons";
import NavLinks from "./Navlinks";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box
      // border={"1px solid blue"}
      w={"100%"}
      zIndex={"2"}
      color="white"
      h={"126px"}
      position={{ base: "none", sm: "none", md: "sticky", lg: "sticky" }}
      top={"0"}
      bgColor={"white"}
      mb={{ base: "200px", sm: "170px", md: "20px", lg: "20px" }}
    >
      <Box
        color="white"
        h={{ base: "130px", sm: "130px", md: "72px", lg: "72px" }}
        bgColor={"white"}
      >
        <Flex
          direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          w="87%"
          color="#333333"
          h={"72px"}
          m={"auto"}
          alignItems={"auto"}
          bgColor={"white"}
        >
          {/* Logo section & search bar */}
          <Flex
            width={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            bgColor={"white"}
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
              />
            </InputGroup>
          </Flex>

          {/* Download app...Etc */}

          <Flex
            justifyContent={"space-evenly"}
            alignItems={"center"}
            width={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            bgColor={"white"}
          >
            <Box display={"flex"} bgColor={"white"} alignItems={"center"}>
              <ImMobile mt={"5px"} mr={"5px"} size="25px" />
              Download App
            </Box>
            <Box
              h={"100%"}
              fontSize={"4xl"}
              borderRight={"1px solid grey"}
            ></Box>
            <Box>Become a Supplier</Box>
            <Box
              h={"100%"}
              fontSize={"4xl"}
              fontWeight={100}
              borderRight={"1px solid grey"}
            ></Box>
            <Box
              textAlign={"center"}
              onClick={() => {
                navigate("/login");
              }}
            >
              <CgProfile style={{ marginLeft: "12px" }} size="20px" />
              <Box>Profile</Box>
            </Box>
            <Box
              ml={"5px"}
              onClick={() => {
                navigate("/cart");
              }}
            >
              <AiOutlineShoppingCart size="25px" />
              <Box>Cart</Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box
        w="100%"
        color="black"
        h={{ base: "230px", sm: "230px", md: "52px", lg: "52px" }}
        bgColor={"white"}
        borderTop={"1px solid rgb(223, 223, 223)"}
        borderBottom={"1px solid rgb(223, 223, 223)"}
      >
        <NavLinks />
      </Box>
    </Box>
  );
}
