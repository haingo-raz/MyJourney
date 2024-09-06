import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reducer/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        middleware: [thunk]
    },
})

export const persistor =  persistStore(store);