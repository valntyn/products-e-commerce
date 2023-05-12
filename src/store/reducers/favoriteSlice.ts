/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IProduct } from '@utils/product';

export interface FavoriteState {
  itemInFavorite: IProduct[]
}

const initialState: FavoriteState = {
  itemInFavorite: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addItemToFavorite: (state, action) => {
      state.itemInFavorite.push(action.payload);
    },
    removeItemFromFavorite: (state, action) => {
      state.itemInFavorite
        = state.itemInFavorite.filter(obj => obj.id !== action.payload);
    },
  },
});

export const {
  addItemToFavorite,
  removeItemFromFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
