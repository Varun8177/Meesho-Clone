import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";

import { Sidebar } from "../components/profileComponents/Sidebar";
import UserInitialDetails from "../components/profileComponents/userDetails";
import { TotalContext } from "../context/TotalContext";

export default function Profile() {
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const { handleAddress } = useContext(TotalContext);
  function getReq(id) {
    axios
      .get(`https://63ca9c80f36cbbdfc75c5b52.mockapi.io/meesho_users/${id}`)
      .then((res) => {
        setData(res.data);
        handleAddress({
          name: res.data.name,
          mobile: res.data.mobile,
          house: "N/A",
          area: "N/A",
          pincode: "N/A",
          city: "N/A",
          country: "N/A",
          location: "N/A",
        });
      });
  }
  useEffect(() => {
    getReq(id);
  }, [id]);

  return (
    <Box>
      <Navbar />
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
    </Box>
  );
}
