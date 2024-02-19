import { Box, Flex, Show, useColorMode } from "@chakra-ui/react";
import React from "react";
import { ImMobile } from "react-icons/im";
import ProfileActions from "../constants/ProfileActions";

const AppDownloadPanel = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      color={colorMode === "light" ? "#333" : "#f5f5f5"}
      justifyContent="space-evenly"
      alignItems="center"
      width={{ base: "100%", sm: "100%", md: "50%", lg: "80%" }}
      bgColor={colorMode === "light" ? "white" : "black"}
    >
      <Box display="flex" alignItems="center" cursor="pointer">
        <ImMobile mt="5px" mr="5px" size="25px" />
        Download App
      </Box>
      <Box h="100%" fontSize="4xl" borderRight="1px solid #ccc"></Box>
      <Show above="xl">
        <Box cursor="pointer">Become a Supplier</Box>
        <Box
          h="100%"
          fontSize="4xl"
          fontWeight={100}
          borderRight="1px solid #ccc"
        />
      </Show>
      <ProfileActions />
    </Flex>
  );
};

export default AppDownloadPanel;
