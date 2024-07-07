import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../auth/AuthSlice';
import { fetchprojectTickets } from '../projectTickets/ProjectTicketSlice';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:3000/bugs', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        return error.response.data;
      }
      toast.error(error.response.data);
      return null;
    }
  },
);

export const fetchTicketById = createAsyncThunk(
  'tickets/fetchTicketById',
  async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/bugs/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      return error.response.data.error;
    }
  },
);

export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticket, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/bugs',
        ticket,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async ({ ticket, id }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/bugs/${id}`,
        ticket,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return error.response.data;
    }
  },
);

export const assignTicket = createAsyncThunk(
  'tickets/assignTicket',
  async (ticketId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/bugs/${ticketId}/assign_bug_or_feature/`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data.bug;
    } catch (error) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
);

export const markTicketAsCompleted = createAsyncThunk(
  'tickets/markTicketAsCompleted',
  async (ticketId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/bugs/${ticketId}/mark_resolved_or_completed/`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data.bug;
    } catch (error) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
);

export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (ticketId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/bugs/${ticketId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data.bug;
    } catch (error) {
      toast.error(error.response.data.error);
      return null;
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  tickets: [],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      if (action.payload.error !== undefined) {
        state.loading = false;
        state.error = action.payload.error;
      } else {
        state.error = null;
        state.loading = false;
        state.tickets = action.payload;
      }
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.tickets.push(action.payload);
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      state.loading = false;
      const updatedTicketIndex = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id,
      );
      if (updatedTicketIndex !== -1) {
        state.tickets[updatedTicketIndex] = action.payload;
      }
    });
    builder.addCase(updateTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchTicketById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTicketById.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets.push(action.payload);
    });
    builder.addCase(fetchTicketById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.tickets = [];
      state.error = null;
    });
    builder.addCase(markTicketAsCompleted.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markTicketAsCompleted.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.map((ticket) => {
        if (ticket.id === action.payload.id) {
          return action.payload;
        }
        return ticket;
      });
    });
    builder.addCase(assignTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(assignTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.map((ticket) => {
        if (ticket.id === action.payload.id) {
          return action.payload;
        }
        return ticket;
      });
    });
    builder.addCase(deleteTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload.id,
      );
    });
    builder.addCase(fetchprojectTickets.fulfilled, (state, action) => {
      state.tickets = action.payload.bugs;
    });
  },
});

export const { remove } = ticketSlice.actions;

export default ticketSlice.reducer;
