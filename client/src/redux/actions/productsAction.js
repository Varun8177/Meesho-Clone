import axios from "axios";
import {
  getProductsDataSuccess,
  getSingleProductDataSuccess,
  startProductLoading,
} from "../slices/productSlice";

const baseurl = process.env.REACT_APP_BASE_URL;

export const getProducts = async (
  handleResponse,
  dispatch,
  options = {},
  signal
) => {
  dispatch(startProductLoading());
  try {
    const res = await axios.get(`${baseurl}/products`, {
      params: options,
      signal,
    });
    dispatch(getProductsDataSuccess(res.data));
  } catch (error) {
    if (error.message !== "canceled") {
      if (error?.response?.data?.message) {
        handleResponse(String(error.response.data.message), "");
      } else {
        handleResponse("something went wrong", "please try again");
      }
    }
  }
};

export const getSingleProduct = async (handleResponse, dispatch, productId) => {
  dispatch(startProductLoading());
  try {
    const res = await axios.get(`${baseurl}/products/${productId}`);
    dispatch(getSingleProductDataSuccess(res.data));
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  }
};
