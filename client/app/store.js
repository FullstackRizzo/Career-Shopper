import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import singleCareerDetailsSlice from '../features/adminActions/singleCareerDetailsSlice';
import viewAllUsersSlice from '../features/adminActions/viewAllUsersSlice';
import viewCareersSlice from '../features/adminActions/viewCareersSlice';
import authReducer from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';
import orderDBSlice from '../features/cart/orderDatabaseSlice';
const store = configureStore({
  reducer: { 
    auth: authReducer,
    viewCareers: viewCareersSlice,
    singleCareerDetails: singleCareerDetailsSlice,
    cart: cartSlice,
    viewAllUsers: viewAllUsersSlice,
    order: orderDBSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";