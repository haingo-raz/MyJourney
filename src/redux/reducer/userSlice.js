import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.email = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.email = null;
      state.isLoggedIn = false;
    },
    updateEmail: (state, action) => {
      state.email = action.payload
    }
  },
});

export const { loginUser, logoutUser, updateEmail } = userSlice.actions;
export default userSlice.reducer;