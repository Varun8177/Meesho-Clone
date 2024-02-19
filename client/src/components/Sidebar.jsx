import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useRef } from "react";
import SidebarHeader from "./sidebar/SidebarHeader";
import Categories from "./sidebar/Categories";
import LogoutButton from "./sidebar/LogoutButton";
import ProfileActions from "./constants/ProfileActions";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex align="center" justifyContent={"space-around"}>
      <Button
        ref={btnRef}
        bgColor="white"
        onClick={onOpen}
        cursor="pointer"
        size="sm"
        _hover={{ bg: "gray.100" }}
        _active={{ bg: "gray.200" }}
        outline="none"
      >
        <GiHamburgerMenu color="black" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent h={"100vh"} overflowY={"auto"}>
          <DrawerCloseButton _hover={{ bg: "gray.200" }} />
          <SidebarHeader onClose={onClose} />
          <DrawerBody p="0" pb="5" mt="auto" textAlign="center">
            <ProfileActions sidebar />
            <Categories />
            <LogoutButton onLogout={() => {}} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Sidebar;
