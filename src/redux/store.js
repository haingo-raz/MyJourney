import {configureStore} from '@reduxjs/toolkit';
import signUpSliceReducer from './slices/signUpSlice';


const store = configureStore({
    reducer: {
        formSignUp: signUpSliceReducer
    },
})

export default store;