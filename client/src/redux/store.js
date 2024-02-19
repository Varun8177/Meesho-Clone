import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productReducer: productSlice,
    cartReducer: cartSlice,
    orderReducer: orderSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
export default store;
