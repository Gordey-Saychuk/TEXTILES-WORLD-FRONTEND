'use client';

import { configureStore } from '@reduxjs/toolkit';
import { tovarsApi } from './api/tovarsApi';
import cartReducer from './cartSlice';  
import authReducer from './authSlice';  
 
export const store = configureStore({
  reducer: {
  [tovarsApi.reducerPath]: tovarsApi.reducer ,
  cart: cartReducer, 
  auth: authReducer 
  },
    
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tovarsApi.middleware)
});
 
 
export type AppStore = typeof store

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']