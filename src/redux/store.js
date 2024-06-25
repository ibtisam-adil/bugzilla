import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import projectReducer from './projects/ProjectSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* any other middleware */),
});

export default store;
