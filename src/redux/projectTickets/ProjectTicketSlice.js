import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../auth/AuthSlice';

export const fetchprojectTickets = createAsyncThunk(
  'projectTickets/fetchprojectTickets',
  async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/projects/${id}/users_and_bugs_by_project`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const assignUserToProject = createAsyncThunk(
  'projectTickets/assignUserToProject',
  async ({ id: developerId, projectId }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/projects/${projectId}/assign_user/${developerId}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
);

export const removeUserFromProject = createAsyncThunk(
  'projectTickets/removeUserFromProject',
  async ({ projectId, id }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/projects/${projectId}/remove_user/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  projectTickets: {},
};

const projectTicketsSlice = createSlice({
  name: 'projectTickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchprojectTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchprojectTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.projectTickets = action.payload;
    });
    builder.addCase(fetchprojectTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(assignUserToProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(assignUserToProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projectTickets.collaborators.push(action.payload);
    });
    builder.addCase(removeUserFromProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeUserFromProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projectTickets.collaborators = state.projectTickets.collaborators.filter(
        (collaborator) => collaborator.id !== action.payload.id,
      );
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.projectTickets = {};
    });
  },
});

export default projectTicketsSlice.reducer;
