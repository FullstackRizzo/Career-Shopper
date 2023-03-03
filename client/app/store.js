import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import viewCareersSlice from '../features/adminActions/viewCareersSlice';
import authReducer from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';
import singleUserSlice from '../features/cart/singleUserSlice';
import allUsersSlice from '../features/cart/allUsersSlice';
const store = configureStore({
  reducer: { 
    auth: authReducer,
    viewCareers: viewCareersSlice,
    cart: cartSlice,
    singleUser: singleUserSlice,
    allUsers: allUsersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
