import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    singleProduct: null,
    error: false,
  },
  reducers: {
    getProductsDataSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    getSingleProductDataSuccess: (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
    },
    SingleProductAddedToCart: (state, action) => {
      state.singleProduct = { ...state.singleProduct, alreadyInCart: true };
    },
    startProductLoading: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  getProductsDataSuccess,
  startProductLoading,
  getSingleProductDataSuccess,
  SingleProductAddedToCart,
} = productsSlice.actions;

export default productsSlice.reducer;
