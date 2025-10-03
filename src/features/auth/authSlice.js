import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will hold { id, name, email, ... }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload; // store user data here
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
