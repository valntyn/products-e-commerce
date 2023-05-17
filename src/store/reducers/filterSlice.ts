/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortFilter } from '@utils/sort';

export type FilterState = {
  appliedQuery: string;
  selectedCategory: string;
  selectedBrands: string[];
  selectedRating: string[];
  selectedPrice: number[];
  sort: SortFilter;
  isReversed: boolean,
};

const initialState: FilterState = {
  appliedQuery: '',
  selectedCategory: 'all products',
  selectedBrands: [],
  selectedRating: [],
  selectedPrice: [0, 0],
  sort: SortFilter.Reset,
  isReversed: false,
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
      const index = state.selectedBrands.indexOf(action.payload);

      if (index === -1) {
        state.selectedBrands.push(action.payload);
      } else {
        state.selectedBrands = state.selectedBrands.filter(
          (brand) => brand !== action.payload,
        );
      }
    },
    setSelectedBrands: (state, action: PayloadAction<string[]>) => {
      state.selectedBrands = action.payload;
    },
    clearBrands: (state) => {
      state.selectedBrands = [];
    },
    setRating: (state, action: PayloadAction<string>) => {
      const index = state.selectedRating.indexOf(action.payload);

      if (index === -1) {
        state.selectedRating.push(action.payload);
      } else {
        state.selectedRating = state.selectedRating.filter(
          (rating) => rating !== action.payload,
        );
      }
    },
    setSelectedRating: (state, action: PayloadAction<string[]>) => {
      state.selectedRating = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.selectedPrice = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<SortFilter>) => {
      state.sort = action.payload;
    },
    setIsReversed: (state, action: PayloadAction<boolean>) => {
      state.isReversed = action.payload;
    },
    resetFilter: (state) => {
      state.appliedQuery = '';
      state.selectedCategory = 'all products';
      state.selectedBrands = [];
      state.selectedRating = [];
      state.selectedPrice = [0, 0];
      state.sort = SortFilter.Reset;
      state.isReversed = false;
    },
  },
});

export const {
  setQuery,
  setCategory,
  setBrand,
  clearBrands,
  setSelectedBrands,
  setRating,
  setSelectedRating,
  resetFilter,
  setPriceRange,
  setSortFilter,
  setIsReversed,
} = filterSlice.actions;

export default filterSlice.reducer;
