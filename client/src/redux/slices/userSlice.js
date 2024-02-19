import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: false,
  },
  reducers: {
    getUserDataSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { getUserDataSuccess, logoutSuccess } = UserSlice.actions;

export default UserSlice.reducer;
