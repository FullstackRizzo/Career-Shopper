import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import singleCareerDetailsSlice from '../features/adminActions/singleCareerDetailsSlice';
import viewAllUsersSlice from '../features/adminActions/viewAllUsersSlice';
import viewCareersSlice from '../features/adminActions/viewCareersSlice';
import authReducer from '../features/auth/authSlice';
// import orderSlice from '../features/cart/orderSlice';
import singleUserSlice from '../features/cart/singleUserSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    viewCareers: viewCareersSlice,
    // order: orderSlice,
    singleUser: singleUserSlice,
    singleCareerDetails: singleCareerDetailsSlice,
    viewAllUsers: viewAllUsersSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
