import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import singleCareerDetailsSlice from '../features/adminActions/singleCareerDetailsSlice';
import viewCareersSlice from '../features/adminActions/viewCareersSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    viewCareers: viewCareersSlice,
    cart: cartSlice,
    singleCareerDetails: singleCareerDetailsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
