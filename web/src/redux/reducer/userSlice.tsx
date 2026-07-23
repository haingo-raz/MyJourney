import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.userId = null;
      state.email = null;
      state.isLoggedIn = false;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateEmail } = userSlice.actions;
export default userSlice.reducer;
