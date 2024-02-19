import { DrawerHeader, Image } from "@chakra-ui/react";
import React from "react";

const SidebarHeader = () => {
  const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;
  return (
    <DrawerHeader
      borderBottomWidth="1px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={`${CLOUDINARY_BASE_PATH}/gcammfhm41mnf0fetggp`}
        alt="logo"
        height="50px"
        w="136px"
        onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
          });
        }}
        cursor="pointer"
      />
    </DrawerHeader>
  );
};

export default SidebarHeader;
