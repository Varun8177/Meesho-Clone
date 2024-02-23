import axios from "axios";
import {
  deleteProduct,
  getProductsDataSuccess,
  getSingleProductDataSuccess,
  startProductLoading,
  updateProduct,
} from "../slices/productSlice";
import { getToken } from "../../components/utils/getToken";

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

export const editProduct = async (
  handleResponse,
  dispatch,
  productId,
  changes,
  handleNextAction
) => {
  try {
    const res = await axios.patch(`${baseurl}/products/${productId}`, changes, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(updateProduct(res.data));
    handleNextAction(true);
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
    handleNextAction();
  }
};

export const deleteProductRequest = async (
  handleResponse,
  dispatch,
  productId,
  handleNextAction
) => {
  try {
    const res = await axios.delete(`${baseurl}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(deleteProduct(res.data));
    handleNextAction(true);
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
    handleNextAction();
  }
};
