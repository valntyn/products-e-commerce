/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productsService from '@store/services/productsService';
import { IProduct } from '@utils/product/product';

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

export const getSingleProduct = createAsyncThunk<IProduct, string>(
  'GET_SINGLE_PRODUCT',

  async (productId, thunkAPI) => {
    try {
      const product = await productsService.getSingleProduct(productId);

      return product;
    } catch (err: unknown | Error) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    }
  },
);

export const getProductsByIds = createAsyncThunk<IProduct[], string[]>(
  'GET_PRODUCTS_BY_IDS',
  async (ids, thunkAPI) => {
    try {
      const productPromises = ids
        .map(id => productsService.getSingleProduct(id));
      const products = await Promise.all(productPromises);

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
  isCartLoading: boolean;
  cartProducts: IProduct[] | [];
  isError: boolean;
  isLoading: boolean;
  visibleProducts: IProduct[] | [];
  selectedProduct: IProduct | null;
  isSelectedProductLoading: boolean;
  isSelectedProductError: boolean;
};

const initialState: ProductsType = {
  products: [],
  isError: false,
  isLoading: false,
  visibleProducts: [],
  cartProducts: [],
  isCartLoading: false,
  selectedProduct: null,
  isSelectedProductLoading: false,
  isSelectedProductError: false,
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
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isSelectedProductLoading = true;
        state.isSelectedProductError = false;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isSelectedProductLoading = false;
        state.isSelectedProductError = false;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.isSelectedProductLoading = false;
        state.isSelectedProductError = true;
      })
      .addCase(getProductsByIds.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(getProductsByIds.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
        state.isCartLoading = false;
      })
      .addCase(getProductsByIds.rejected, (state) => {
        state.isCartLoading = false;
      });
  },
});

export const { setVisibleProducts } = productsSlice.actions;

export default productsSlice.reducer;
