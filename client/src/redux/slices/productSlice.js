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
    filterOptions: [],
    selectedProduct: null,
  },
  reducers: {
    getProductsDataSuccess: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
      state.filterOptions = action.payload.filterOptions;
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
    updateSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        return product._id === action.payload._id ? action.payload : product;
      });
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => {
        return product._id !== action.payload._id;
      });
    },
  },
});

export const {
  getProductsDataSuccess,
  startProductLoading,
  getSingleProductDataSuccess,
  SingleProductAddedToCart,
  updateSelectedProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
