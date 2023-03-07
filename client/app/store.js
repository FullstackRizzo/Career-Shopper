import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import singleCareerDetailsSlice from '../features/adminActions/singleCareerDetailsSlice';
import viewAllUsersSlice from '../features/adminActions/viewAllUsersSlice';
import viewCareersSlice from '../features/adminActions/viewCareersSlice';
import authReducer from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';
import userCartSlice from '../features/cart/userCartSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    viewCareers: viewCareersSlice,
    singleCareerDetails: singleCareerDetailsSlice,
    cart: cartSlice,
    userCart: userCartSlice,
    viewAllUsers: viewAllUsersSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";