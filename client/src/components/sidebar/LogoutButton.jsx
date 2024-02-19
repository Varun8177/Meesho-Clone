import { Button } from "@chakra-ui/react";
import React from "react";

const LogoutButton = ({ onLogout }) => {
  return (
    <Button
      w="80%"
      m="auto"
      bgColor="pink.400"
      _hover={{
        bg: "pink.500",
      }}
      cursor="pointer"
      color="white"
      onClick={onLogout}
      alignSelf="end"
      mt="20px"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
