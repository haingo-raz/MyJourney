import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.email = action.payload;
    },
    logoutUser: (state) => {
      state.email = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;