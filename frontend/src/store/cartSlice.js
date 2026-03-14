import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8001/cart/';

export const addToCart = createAsyncThunk('cart/add', async (item, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await axios.post(API_URL, item, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Find if item already exists and update or add new
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      });
  },
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
