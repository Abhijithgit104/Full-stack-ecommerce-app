import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/products/');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to fetch products");
  }
});

export const fetchProductDetail = createAsyncThunk('products/fetchDetail', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to fetch product details");
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetail: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetail } = productSlice.actions;
export default productSlice.reducer;
