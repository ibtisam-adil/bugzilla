import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { toast } from 'react-toastify';

export const login = createAsyncThunk('login/loginUser', async (userCredentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/login', {
      user: userCredentials,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('token', response.headers.authorization);
    const { data } = response;
    // toast.success(data.message);
    return data;
  } catch (error) {
    // toast.error(error.response.data.message || 'Login failed');
    return rejectWithValue(error.response.data.message);
  }
});

export const logout = createAsyncThunk('login/logoutUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete('http://127.0.0.1:3000/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const { data } = response;
    localStorage.removeItem('token');
    // toast.success(data.message);
    return data;
  } catch (error) {
    // toast.error(error.response.data.message || 'Logout failed');
    return rejectWithValue(error.response.data.message);
  }
});

export const currentUser = createAsyncThunk('login/currentUser', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://127.0.0.1:3000/current_user', {
      headers: {
        Authorization: token,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const signup = createAsyncThunk('signup/signupUser', async (userCredentials) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/signup', {
      user: userCredentials,
    });
    const { data } = response;
    localStorage.setItem('token', response.headers.authorization);
    // toast.success(response.data.message);
    return data;
  } catch (error) {
    // toast.error(error.response.data.errors[0]);
    return null;
  }
});

export const fetchDevelopers = createAsyncThunk(
  'developers/fetchDevelopers',
  async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://127.0.0.1:3000/developers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data;
  },
);

export const fetchQas = createAsyncThunk('qas/fetchQas', async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://127.0.0.1:3000/users/qas', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
  user: null,
  developers: [],
  qas: [],
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload
        && action.payload.user !== undefined
        && action.payload.user !== null
      ) {
        state.user = action.payload.user;
        state.isLogin = true;
      }
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isLogin = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(currentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload
        && action.payload.user !== undefined
        && action.payload.user !== null
      ) {
        state.user = action.payload.user;
        state.isLogin = true;
      }
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload
        && action.payload.user !== undefined
        && action.payload.user !== null
      ) {
        state.user = action.payload.user;
        state.isLogin = true;
      }
    });
    builder.addCase(fetchDevelopers.fulfilled, (state, action) => {
      state.loading = false;
      state.developers = action.payload;
    });
    builder.addCase(fetchDevelopers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchQas.fulfilled, (state, action) => {
      state.loading = false;
      state.qas = action.payload;
    });
    builder.addCase(fetchQas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

// manager Token: Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOT
// BiMTZhZC1hMzEyLTQ3OWEtYTI2Ni01MTMyNGQ5NjA2NzQiLCJzd
// WIiOiIyMyIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTcxOTI4
// ODMyMSwiZXhwIjoxNzE5NDYxMTIxfQ.UsyflqZ9fFJNyc-E7P8iLWOMtGwxUYMgUvA0oGNNk_s
