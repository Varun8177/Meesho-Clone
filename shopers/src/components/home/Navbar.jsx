import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import shoperzLogo from "../images/shoperzLogo.png";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import NavLinks from "./Navlinks";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box
      // border={"1px solid red"}
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
              onClick={() => navigate("/")}
            />
            <InputGroup ml={"2%"} alignItems={"center"}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon mt={"30px"} color="gray.300" />}
              />
              <Input
                htmlSize={10}
                width={{ sm: "300px", md: "360px", lg: "400px" }}
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
            <Box display={"flex"} bgColor={"white"}>
              <SearchIcon mt={"5px"} mr={"5px"} />
              Download App
            </Box>
            <Box h={"100%"} fontSize={"4xl"}>
              |
            </Box>
            <Box>Become a Supplier</Box>
            <Box h={"100%"} fontSize={"4xl"}>
              |
            </Box>
            <Box>
              <StarIcon ml={"15px"} />
              <Box>Profile</Box>
            </Box>
            <Box ml={"5px"}>
              <StarIcon ml={"7px"} />
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
        borderTop={"1px solid black"}
        borderBottom={"1px solid black"}
      >
        <NavLinks />
      </Box>
    </Box>
  );
}
