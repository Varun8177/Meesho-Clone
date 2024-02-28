import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Flex } from "@chakra-ui/react";
import ProfileActionBtn from "./ProfileActionBtn";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/actions/userActions";

const ProfileActions = ({ sidebar = false }) => {
  const { user } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      getCurrentUser(token, dispatch);
    }
  }, [dispatch]);

  const links = {
    private: [
      {
        path: "/profile",
        title: "Profile",
        icon: <CgProfile size="20px" />,
      },
      {
        path: "/cart",
        title: "Cart",
        icon: <AiOutlineShoppingCart size="20px" />,
      },
    ],
    public: [
      { path: "/sign-up", title: "Sign-up" },
      { path: "/login", title: "Login" },
    ],
  };

  return sidebar ? (
    <Flex
      justifyContent={"space-between"}
      w={"80%"}
      m={"auto"}
      mb={"10px"}
      p={"1rem"}
      textAlign={"left"}
    >
      {user
        ? links.private.map((item) => (
            <ProfileActionBtn {...item} key={item.path} sidebar />
          ))
        : links.public.map((item, i) => (
            <ProfileActionBtn {...item} key={item.path} sidebar />
          ))}
    </Flex>
  ) : (
    <>
      {user
        ? links.private.map((item, i) => (
            <ProfileActionBtn {...item} key={item.path} />
          ))
        : links.public.map((item, i) => (
            <ProfileActionBtn {...item} key={item.path} />
          ))}
    </>
  );
};

export default ProfileActions;
