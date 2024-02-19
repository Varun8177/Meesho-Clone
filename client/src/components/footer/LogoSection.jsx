import { Image, Stack, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import SocialButton from "../constants/SocialButton";
const CLOUDINARY_BASE_PATH = process.env.REACT_APP_CLOUDINARY_BASE_PATH;

const Logo = memo(() => (
  <Image
    height={32}
    src={`${CLOUDINARY_BASE_PATH}/gcammfhm41mnf0fetggp`}
    mb="-50px"
    ml={"-30px"}
    loading="lazy"
  />
));

const LogoSection = () => {
  const socialButtons = [
    { label: "Twitter", icon: <FaTwitter />, href: "#" },
    { label: "YouTube", icon: <FaYoutube />, href: "#" },
    { label: "Instagram", icon: <FaInstagram />, href: "#" },
  ];
  return (
    <Stack spacing={6}>
      <Logo />
      <Text fontSize={"sm"}>
        Trusted by more than 1 Crore Indians Cash on Delivery | Free Delivery
      </Text>
      <Stack direction={"row"} spacing={6}>
        {socialButtons.map((button, index) => (
          <SocialButton key={index} label={button.label} href={button.href}>
            {button.icon}
          </SocialButton>
        ))}
      </Stack>
    </Stack>
  );
};

export default LogoSection;
