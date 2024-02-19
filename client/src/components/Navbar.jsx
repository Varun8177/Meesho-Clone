import React, { Suspense, lazy } from "react";
import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import handleScrollTop from "./utils/handleScrollTop";
import Searchbar from "./navbar/Searchbar";
import Navlinks from "./navbar/Navlinks";
import { useNavigate } from "react-router-dom";
const Sidebar = lazy(() => import("./Sidebar"));
const AppDownloadPanel = lazy(() => import("./navbar/AppDownloadPanel"));

const Navbar = () => {
  const { colorMode } = useColorMode();
  const [showAppPanel] = useMediaQuery("(min-width: 988px)");
  const [showSidebar] = useMediaQuery("(max-width: 988px)");
  const navigate = useNavigate();
  const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;
  return (
    <Box
      w="100%"
      zIndex="2"
      h={{ base: "auto", lg: "126px" }}
      position="sticky"
      top="0"
      bgColor={colorMode === "light" ? "white" : "black"}
      mb={{ base: "5px", lg: "20px" }}
    >
      <Box
        color="white"
        h="72px"
        bgColor={colorMode === "light" ? "white" : "black"}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          w="87%"
          h="72px"
          m="auto"
          alignItems="auto"
          bgColor={colorMode === "light" ? "white" : "black"}
        >
          {/* Logo section & search bar */}
          <Flex
            width={{ base: "100%", md: "80%" }}
            bgColor={colorMode === "light" ? "white" : "black"}
            align="center"
          >
            {showSidebar && (
              <Suspense fallback={<>loading...</>}>
                <Sidebar />
              </Suspense>
            )}
            {/* logo */}
            <Image
              src={`${CLOUDINARY_BASE_PATH}/gcammfhm41mnf0fetggp`}
              alt="logo"
              height="50px"
              w="136px"
              mt="10px"
              onClick={() => {
                navigate("/");
                handleScrollTop();
              }}
              cursor="pointer"
            />
            <Searchbar />
          </Flex>
          {showAppPanel && (
            <Suspense fallback={<>loading...</>}>
              <AppDownloadPanel />
            </Suspense>
          )}
        </Flex>
      </Box>
      {showAppPanel && (
        <Suspense fallback={<>loading...</>}>
          <Box
            w="100%"
            bgColor={colorMode === "light" ? "white" : "black"}
            color={colorMode === "light" ? "black" : "white"}
            borderTop={"1px solid rgb(223, 223, 223)"}
            borderBottom={"1px solid rgb(223, 223, 223)"}
          >
            <Navlinks />
          </Box>
        </Suspense>
      )}
    </Box>
  );
};

export default Navbar;
