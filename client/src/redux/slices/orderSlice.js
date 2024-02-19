import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    total: 0,
    address: null,
    products: null,
    orders: null,
  },
  reducers: {
    getUserOrdersSuccess: (state, action) => {
      state.orders = action.payload;
    },
    getOrderDataSuccess: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.address = action.payload.deliveryAddress;
      state.loading = false;
    },
    updateOrderSuccess: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.address = action.payload.deliveryAddress;
      state.loading = false;
    },
    startOrderLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  getOrderDataSuccess,
  startOrderLoading,
  updateOrderSuccess,
  getUserOrdersSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;
