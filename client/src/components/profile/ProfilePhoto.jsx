import { Box, Center, Image, Spinner, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import UseResponseHandler from "../utils/UseResponseHandler";
import axios from "axios";
import { updateCurrentUser } from "../../redux/actions/userActions";

const baseurl = process.env.REACT_APP_BASE_URL;

const ProfilePhoto = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { handleResponse } = UseResponseHandler();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoading = (val) => setLoading(val);

  const handleProfilePhotoChange = async (e) => {
    handleLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(`${baseurl}/upload`, formData);
      handleLoading(true);
      updateCurrentUser(
        { profilePhoto: res.data.secure_url },
        dispatch,
        handleLoading,
        handleResponse,
        () => {}
      );
    } catch (error) {
      handleLoading(false);
      if (error?.response?.data?.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    }
  };

  return (
    <Stack
      m={"auto"}
      w={"fit-content"}
      pos="relative"
      justify="center"
      mt="10px"
    >
      <input
        type="file"
        id="imageuploader"
        style={{ display: "none" }}
        onChange={handleProfilePhotoChange}
        disabled={loading}
      />
      <label htmlFor="imageuploader" style={{ cursor: "pointer" }}>
        <Image
          margin={"auto"}
          objectFit={"contain"}
          src={user?.profilePhoto}
          rounded="full"
          h="200px"
          w="200px"
        />
        {loading && (
          <Center
            h="200px"
            w="200px"
            bg={"grey"}
            opacity={0.3}
            pos="absolute"
            top={0}
            rounded="full"
          >
            <Spinner />
          </Center>
        )}
        <Box pos="absolute" bottom={0} right={5}>
          <MdOutlineCloudUpload size={30} />
        </Box>
      </label>
    </Stack>
  );
};

export default ProfilePhoto;
