import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/profile/Sidebar";
import UserDetails from "../components/profile/UserDetails";
import { useSearchParams } from "react-router-dom";
import Orders from "../components/profile/Orders";
import Address from "../components/profile/Address";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  return (
    <Box w={{ lg: "70%" }} margin={"auto"} h={"600px"} mt="10px">
      <Flex justifyContent={"space-between"} w={"100%"} gap={"5px"}>
        <Box
          w={"30%"}
          minW="fit-content"
          border={"1px solid rgb(223, 223, 223)"}
        >
          <Sidebar />
        </Box>
        <Box
          w={{ lg: "67%" }}
          flexGrow={1}
          border={"1px solid rgb(223, 223, 223)"}
          alignItems={"center"}
        >
          {type === null ? (
            <UserDetails />
          ) : type === "address" ? (
            <Address />
          ) : (
            <Orders />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
