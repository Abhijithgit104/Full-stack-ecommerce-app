import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const addToCart = createAsyncThunk('cart/add', async (item, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await api.post('/cart/', item);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await api.get('/cart/');
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
    clearCart: (state) => {
      state.items = [];
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

export const { removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
