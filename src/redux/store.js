import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* any other middleware */),
});

export default store;
