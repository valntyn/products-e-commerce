/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productsService from '@store/services/productsService';
import { IProduct } from '@utils/product';

export const getProducts = createAsyncThunk<IProduct[]>(
  'GET_PRODUCTS',
  async (_, thunkAPI) => {
    try {
      const products = await productsService.getProducts();

      return products;
    } catch (err: unknown | Error) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    }
  },
);

type ProductsType = {
  products: IProduct[] | [];
  isError: boolean;
  isLoading: boolean;
  visibleProducts: IProduct[] | [];
};

const initialState: ProductsType = {
  products: [],
  isError: false,
  isLoading: false,
  visibleProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setVisibleProducts: (state, action) => {
      state.visibleProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  setVisibleProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
