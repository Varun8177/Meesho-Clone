import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const LinkSection = () => {
  const linkSections = [
    {
      header: "Company",
      links: ["About us", "Blog", "Contact us", "Pricing", "Testimonials"],
    },
    {
      header: "Support",
      links: [
        "Help Center",
        "Terms of Service",
        "Legal",
        "Privacy Policy",
        "Status",
      ],
    },
  ];
  return (
    <>
      {linkSections.map((section) => (
        <Stack align={"flex-start"} key={section.header}>
          <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
            {section.header}
          </Text>
          {section.links.map((link) => (
            <Link href={"#"} key={link}>
              {link}
            </Link>
          ))}
        </Stack>
      ))}
    </>
  );
};

export default LinkSection;
