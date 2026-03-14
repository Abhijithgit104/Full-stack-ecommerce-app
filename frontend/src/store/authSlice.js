import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    if (response.data.access) localStorage.setItem('token', response.data.access);
    if (response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register/', userData);
    if (response.data.access) localStorage.setItem('token', response.data.access);
    if (response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const safeParse = (key) => {
  const item = localStorage.getItem(key);
  if (!item || item === 'undefined') return null;
  try {
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: safeParse('user'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
