import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8001/products/';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchProductDetail = createAsyncThunk('products/fetchDetail', async (id) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    selectedProduct: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export default productSlice.reducer;
