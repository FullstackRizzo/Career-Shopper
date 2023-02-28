import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import viewCareersSlice from '../features/adminActions/viewCareersSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    viewCareers: viewCareersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
