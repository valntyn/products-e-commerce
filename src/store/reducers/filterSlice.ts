/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  appliedQuery: string;
  selectedCategory: string;
  selectedBrand: string;
};

const initialState: FilterState = {
  appliedQuery: '',
  selectedCategory: 'All products',
  selectedBrand: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.appliedQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const {
  setQuery,
  setCategory,
  setBrand,
} = filterSlice.actions;

export default filterSlice.reducer;
