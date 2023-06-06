/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productsService from '@store/services/productsService';
import { IProduct } from '@utils/product/product';

type FavoriteSliceState = {
  isLoading: boolean;
  itemsInFavorite: string[],
  productsInFavorite: IProduct[],
};

const initialState: FavoriteSliceState = {
  isLoading: true,
  itemsInFavorite: [],
  productsInFavorite: [],
};

export const getProductsByIdsFavorite = createAsyncThunk<IProduct[], string[]>(
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

const favoriteSlice = createSlice({
  name: 'favorite',

  initialState,
  reducers: {
    addItemToFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (!state.itemsInFavorite.includes(id)) {
        state.itemsInFavorite.push(id);
      }
    },
    removeItemFromFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.itemsInFavorite = state.itemsInFavorite
        .filter((itemId) => itemId !== id);
      state.productsInFavorite = state.productsInFavorite
        .filter((product) => product.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByIdsFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByIdsFavorite.fulfilled, (state, action) => {
        state.productsInFavorite = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductsByIdsFavorite.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  addItemToFavorite,
  removeItemFromFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
