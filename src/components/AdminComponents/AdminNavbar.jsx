import { Box, Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import shoperzLogo from "../images/shoperzLogo.png";
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

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { handleSearchValue } = useContext(SearchContext);
  const { colorMode } = useColorMode();
  return (
    <Box
      borderWidth={"1px"}
      w={"100%"}
      zIndex={"2"}
      position={{ base: "none", sm: "none", md: "sticky", lg: "sticky" }}
      top={"0"}
      bgColor={colorMode === "light" ? "white" : "black"}
      mb={{ base: "200px", sm: "170px", md: "20px", lg: "20px" }}
    >
      <Flex
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        w="87%"
        h={"72px"}
        m={"auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        bgColor={colorMode === "light" ? "white" : "black"}
      >
        {/* Logo section & search bar */}

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
            navigate("/profile/Admin");
          }}
          cursor={"pointer"}
        />
        <Box>
          <ColorModeToggle />
        </Box>
      </Flex>

      {/* Download app...Etc */}
    </Box>
  );
}
