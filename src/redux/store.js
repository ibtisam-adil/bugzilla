import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import projectReducer from './projects/ProjectSlice';
import projectTicketsReducer from './projectTickets/ProjectTicketSlice';
import ticketReducer from './Tickets/TicketSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    projectTickets: projectTicketsReducer,
    Ticket: ticketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* any other middleware */),
});

export default store;
