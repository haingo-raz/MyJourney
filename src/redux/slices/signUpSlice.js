import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

const initialState = {
    signUp: false,
}

export const signUpSlice = createSlice({
    name: 'formSignUp',
    initialState, 
    reducers: {
        setSignUp: (state) => {
            state.signUp = true
        },
    },
})

//export actions
export const { setSignUp } = signUpSlice.actions;

//export reducer
export default signUpSlice.reducer;