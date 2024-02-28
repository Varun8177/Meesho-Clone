import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import handleScrollTop from "../utils/handleScrollTop";

const ProfileActionBtn = ({ path, icon, title, sidebar = false }) => {
  const navigate = useNavigate();
  return sidebar ? (
    <Button
      key={path}
      variant="outline"
      colorScheme="gray"
      fontSize="md"
      w={"45%"}
      _hover={{ bg: "gray.200" }}
      leftIcon={icon}
      onClick={() => {
        handleScrollTop();
        navigate(path);
      }}
    >
      {title}
    </Button>
  ) : (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      cursor="pointer"
      flexDir="column"
      onClick={() => {
        handleScrollTop();
        navigate(path);
      }}
    >
      {icon}
      <Box>{title}</Box>
    </Flex>
  );
};

export default ProfileActionBtn;
