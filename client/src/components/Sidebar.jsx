import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useRef } from "react";
import SidebarHeader from "./sidebar/SidebarHeader";
import Categories from "./sidebar/Categories";
import LogoutButton from "./sidebar/LogoutButton";
import ProfileActions from "./constants/ProfileActions";
import { RiAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  return (
    <Flex align="center" justifyContent={"space-around"}>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        icon={<GiHamburgerMenu color="black" size="25px" />}
        mr={"10px"}
        bg="white"
      />
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
            {user?.role === "admin" && (
              <Button
                leftIcon={<RiAddFill size="25px" />}
                onClick={() => {
                  navigate("/create-product");
                }}
                bg="rgb(244, 51, 151)"
                _hover={{ bg: "rgb(199, 60, 157)" }}
                color="white"
              >
                Add Product
              </Button>
            )}

            <Categories />
            <LogoutButton onLogout={() => {}} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Sidebar;
