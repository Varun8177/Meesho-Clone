import { useState } from "react";
import UseResponseHandler from "../utils/UseResponseHandler";
import axios from "axios";

const baseurl = process.env.REACT_APP_BASE_URL;

const useImageUploader = () => {
  const { handleResponse } = UseResponseHandler();
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async (image) => {
    setLoading(false);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.post(`${baseurl}/upload`, formData);
      return res.data.secure_url;
    } catch (error) {
      if (error?.response?.data?.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return { uploadImageToCloudinary, loading };
};

export default useImageUploader;
