import axios from "axios";
import { getToken } from "../../components/utils/getToken";
import {
  getOrderDataSuccess,
  getUserOrdersSuccess,
  startOrderLoading,
} from "../slices/orderSlice";

const baseurl = process.env.REACT_APP_BASE_URL;

export const getUserOrders = async (dispatch, handleResponse) => {
  try {
    dispatch(startOrderLoading());
    const res = await axios.get(`${baseurl}/order`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(getUserOrdersSuccess(res.data));
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  }
};

export const getOrderDetails = async (orderId, dispatch, handleResponse) => {
  try {
    dispatch(startOrderLoading());
    const res = await axios.get(`${baseurl}/order/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(getOrderDataSuccess(res.data));
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  }
};

export const updateOrderDetails = async (
  orderId,
  dataToSend,
  dispatch,
  handleResponse,
  handleLoading
) => {
  try {
    dispatch(startOrderLoading());
    const res = await axios.patch(`${baseurl}/order/${orderId}`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(getOrderDataSuccess(res.data));
  } catch (error) {
    if (error?.response?.data?.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  } finally {
    handleLoading(false);
  }
};

export const createUserOrders = async (
  dataToSend,
  handleResponse,
  handleNavigation
) => {
  try {
    const res = await axios.post(`${baseurl}/order`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (res?.data?._id) {
      handleNavigation(res.data._id);
    }
  } catch (error) {
    handleResponse(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  } finally {
    handleNavigation();
  }
};
