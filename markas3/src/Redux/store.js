import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer from './features/authSlice';
import menuSlice from './features/MenuSlice';
import AddressDetailsSlice from './features/AddressDetailsSlice';
import organizationSlice from './features/organizationSlice';
import authSlice from './features/authSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    authReducer,
    authSlice,
    menuSlice,
    AddressDetailsSlice,
  },
});

export const useAppSelector = useSelector;

export default store;
