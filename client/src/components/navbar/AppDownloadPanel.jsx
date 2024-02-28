import {
  Box,
  Button,
  Flex,
  IconButton,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { ImMobile } from "react-icons/im";
import { MdOutlineSell } from "react-icons/md";
import ProfileActions from "../constants/ProfileActions";
import { RiAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AppDownloadPanel = () => {
  const { colorMode } = useColorMode();
  const { user, loading } = useSelector((store) => store.userReducer);
  const [iconsOnly] = useMediaQuery("(max-width: 1096px)");
  const navigate = useNavigate();

  const BtnStyle = {
    bg: user?.role === "admin" ? "rgb(244, 51, 151)" : "white",
    _hover: {
      bg: user?.role === "admin" ? "rgb(199, 60, 157)" : "white",
    },
    color: user?.role === "admin" ? "white" : "black",
  };

  return (
    <Flex
      color={colorMode === "light" ? "#333" : "#f5f5f5"}
      justifyContent="space-evenly"
      alignItems="center"
      width={{ base: "100%", sm: "100%", md: "50%", lg: "80%" }}
      bgColor={colorMode === "light" ? "white" : "black"}
    >
      {iconsOnly ? (
        <ImMobile size="25px" />
      ) : (
        <Button
          leftIcon={<ImMobile size="25px" />}
          bg="white"
          _hover={{ bg: "white" }}
        >
          Download App
        </Button>
      )}
      <Box h="100%" fontSize="4xl" borderRight="1px solid #ccc"></Box>
      {iconsOnly ? (
        <IconButton
          icon={
            user && user?.role === "admin" ? (
              <RiAddFill size="25px" />
            ) : (
              <MdOutlineSell size="25px" />
            )
          }
          colorScheme="pink"
          variant="solid"
          onClick={() => {
            if (user && user?.role === "admin") {
              navigate("/create-product");
            }
          }}
        />
      ) : (
        <Button
          leftIcon={
            user && user?.role === "admin" ? (
              <RiAddFill size="25px" />
            ) : (
              <MdOutlineSell size="25px" />
            )
          }
          onClick={() => {
            if (user && user?.role === "admin") {
              navigate("/create-product");
            }
          }}
          isLoading={loading}
          {...BtnStyle}
        >
          {user?.role === "admin" ? "Add Product" : "Become a seller"}
        </Button>
      )}
      <Box h="100%" fontSize="4xl" borderRight="1px solid #ccc"></Box>
      <ProfileActions />
    </Flex>
  );
};

export default AppDownloadPanel;
