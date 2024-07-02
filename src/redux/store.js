import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import projectReducer from './projects/ProjectSlice';
import projectTicketsReducer from './projectTickets/ProjectTicketSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    projectTickets: projectTicketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* any other middleware */),
});

export default store;
