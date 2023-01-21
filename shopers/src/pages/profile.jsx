import { Box, Flex } from "@chakra-ui/react";

import { Sidebar } from "../components/profileComponents/Sidebar";
import UserInitialDetails from "../components/profileComponents/userDetails";

export default function Profile() {
  return (
    <Box w={"70%"} margin={"auto"} h={"600px"}>
      <Flex justifyContent={"space-between"} w={"100%"}>
        <Box w={"30%"} border={"1px solid rgb(223, 223, 223)"}>
          <Sidebar />
        </Box>
        <Box
          w={"67%"}
          border={"1px solid rgb(223, 223, 223)"}
          alignItems={"center"}
        >
          <UserInitialDetails />
        </Box>
      </Flex>
    </Box>
  );
}
