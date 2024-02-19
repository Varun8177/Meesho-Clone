import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    singleProduct: null,
    error: false,
    totalProducts: 0,
    totalPages: 0,
  },
  reducers: {
    getProductsDataSuccess: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
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
