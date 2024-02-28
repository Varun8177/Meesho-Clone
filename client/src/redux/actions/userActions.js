import axios from "axios";
import { getUserDataSuccess, startLoading } from "../slices/userSlice";
import { getToken } from "../../components/utils/getToken";
const baseurl = process.env.REACT_APP_BASE_URL;

export const register = async (userdata, handleResponse) => {
  try {
    const res = await axios.post(`${baseurl}/users/register`, userdata);
    handleResponse(
      res.data.message || `OTP has been sent to ${userdata.email}`,
      "",
      true
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.data.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    }
  }
};

export const verifyRegisterOtp = async (otp, mobile, handleResponse) => {
  try {
    await axios.post(`${baseurl}/users/mobile-verify/register`, {
      otp,
      mobile,
    });
    handleResponse("verified successfully", "rediecting to login...", true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.data.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    }
  }
};

export const login = async (mobile, CustomToast) => {
  try {
    const res = await axios.post(`${baseurl}/users/login`, {
      mobile,
    });

    CustomToast(res.data.message || "OTP has been sent", "", true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.data.message) {
        CustomToast(String(error.response.data.message), "");
      } else {
        CustomToast("something went wrong", "please try again");
      }
    }
  }
};

export const verifyloginOtp = async (otp, mobile, dispatch, handleResponse) => {
  try {
    const res = await axios.post(`${baseurl}/users/mobile-verify/login`, {
      otp,
      mobile,
    });
    dispatch(getUserDataSuccess(res.data.user));
    localStorage.setItem("token", res.data.token);
    handleResponse("verified successfully", "rediecting to home...", true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.data.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    }
  }
};

export const getCurrentUser = async (token, dispatch) => {
  dispatch(startLoading());
  try {
    const res = await axios.get(`${baseurl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserDataSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentUser = async (
  changes,
  dispatch,
  handleLoading,
  handleResponse,
  ToggleShowDetails
) => {
  try {
    const res = await axios.patch(
      `${baseurl}/users/me`,
      { changes },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    dispatch(getUserDataSuccess(res.data));
    ToggleShowDetails(true);
    handleResponse("successfully updated profile", "", true);
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  } finally {
    handleLoading(false);
  }
};
