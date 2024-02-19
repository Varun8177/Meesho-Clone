import { getToken } from "../../components/utils/getToken";
import {
  DeleteCartDataSuccess,
  UpdateCartDataSuccess,
  getCartDataSuccess,
  getCartTotal,
  startCartLoading,
  updateCartTotal,
} from "../slices/cartSlice";
import { SingleProductAddedToCart } from "../slices/productSlice";
import axios from "axios";

const baseurl = process.env.REACT_APP_BASE_URL;

export const getCartData = async (dispatch, handleResponse) => {
  startCartLoading();
  try {
    const res = await axios.get(`${baseurl}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(getCartDataSuccess(res.data.cart));
    dispatch(getCartTotal(res.data.totalPrice));
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  }
};

export const updateCartData = async (
  dispatch,
  type = "add",
  productId,
  handleResponse,
  handleLoading
) => {
  startCartLoading();
  try {
    const res = await axios.patch(
      `${baseurl}/cart/${productId}/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    dispatch(UpdateCartDataSuccess(res.data));
    let val = type === "add" ? res.data.product.price : -res.data.product.price;
    dispatch(updateCartTotal(val));
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  } finally {
    handleLoading("");
  }
};

export const deleteCartData = async (
  dispatch,
  productId,
  handleResponse,
  handleLoading
) => {
  startCartLoading();
  try {
    const res = await axios.delete(`${baseurl}/cart/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch(DeleteCartDataSuccess(res.data));
    dispatch(updateCartTotal(-res.data.product.price * res.data.quantity));
    handleResponse("deleted item successfully", "", true);
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  } finally {
    handleLoading("");
  }
};

export const clearCartData = async (handleResponse, handleNextTask) => {
  try {
    await axios.delete(`${baseurl}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    handleNextTask();
  } catch (error) {
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  }
};

export const AddToCart = async (
  dispatch,
  productId,
  handleCartLoading,
  handleResponse
) => {
  try {
    await axios.post(
      `${baseurl}/cart/${productId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    dispatch(SingleProductAddedToCart());
    handleResponse("added to cart", "visit your cart to checkout", true);
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      handleResponse(String(error.response.data.message), "");
    } else {
      handleResponse("something went wrong", "please try again");
    }
  } finally {
    handleCartLoading(false);
  }
};
