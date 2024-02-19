import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    products: null,
    error: false,
    total: 0,
  },
  reducers: {
    getCartDataSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    getCartTotal: (state, action) => {
      state.total = action.payload;
    },
    updateCartTotal: (state, action) => {
      state.total = state.total + action.payload;
    },
    UpdateCartDataSuccess: (state, action) => {
      state.products = state.products.map((product) => {
        return action.payload._id === product._id ? action.payload : product;
      });
      state.loading = false;
    },
    DeleteCartDataSuccess: (state, action) => {
      state.products = state.products.filter((product) => {
        return product._id !== action.payload._id;
      });
      state.loading = false;
    },
    startCartLoading: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  getCartDataSuccess,
  startCartLoading,
  DeleteCartDataSuccess,
  UpdateCartDataSuccess,
  getCartTotal,
  updateCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
