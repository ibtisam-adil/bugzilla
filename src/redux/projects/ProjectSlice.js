import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../auth/AuthSlice';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:3000/projects', {
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

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://127.0.0.1:3000/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const createProjects = createAsyncThunk(
  'projects/createProjects',
  async (project) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://127.0.0.1:3000/projects',
        project,
        {
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

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ project, id }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/projects/${id}`,
        project,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success('Project updated successfully');
      return response.data.project;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/projects/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      toast.success('Project deleted successfully');
      return response.data;
    } catch (error) {
      toast.error('Error deleting project');
      return error.response.data;
    }
  },
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: ((builder) => {
    builder.addCase(createProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
    });
    builder.addCase(createProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      if (action.payload.error !== undefined) {
        state.loading = false;
        state.error = action.payload.error;
      } else {
        state.loading = false;
        state.projects = action.payload;
      }
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProjectById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
    });
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProject = action.payload;
      const index = state.projects.findIndex((project) => project.id === updatedProject.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
      }
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
      const id = action.payload;
      state.projects = state.projects.filter((project) => project.id !== id);
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.projects = [];
      state.error = null;
    });
  }),
});

export default projectSlice.reducer;
