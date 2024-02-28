import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getUserDataSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { getUserDataSuccess, logoutSuccess, startLoading } =
  UserSlice.actions;

export default UserSlice.reducer;
