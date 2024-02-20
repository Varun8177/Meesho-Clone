import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const BackBtnWrapper = ({ path = "/", content = "back to home", children }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box pos="fixed" top={0} p={4}>
        <Button
          textAlign="center"
          bgColor="rgb(244, 51, 151)"
          variant="outline"
          color={"white"}
          _hover={{ bg: "rgb(199, 60, 157)" }}
          leftIcon={<TbArrowBackUp />}
          onClick={() => navigate(path)}
        >
          <span style={{ textTransform: "uppercase" }}>
            {content.charAt(0)}
          </span>
          {content.substring(1)}
        </Button>
      </Box>
      {children}
    </>
  );
};

export default BackBtnWrapper;
