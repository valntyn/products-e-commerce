/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProductForCart } from '@utils/product/productForCart';

type ProductsForCatType = {
  items: ProductForCart[];
  prices: { [id: string]: number };
};

const initialState: ProductsForCatType = {
  items: [],
  prices: {},
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    setSelectedStock: (
      state,
      action: PayloadAction<{ id: string, quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);

      if (product) {
        product.selectedStock = quantity;
      }
    },
    setSelectedPackage: (
      state,
      action: PayloadAction<{ id: string, typeOfPack: string }>,
    ) => {
      const { id, typeOfPack } = action.payload;
      const product = state.items.find(item => item.id === id);

      if (product) {
        product.selectedPackage = typeOfPack;
      }
    },
    setPrice: (
      state,
      action: PayloadAction<{ id: string; fixedPrice: number }>,
    ) => {
      const { id, fixedPrice } = action.payload;

      state.prices[id] = fixedPrice;
    },
    removePrice: (state, action) => {
      const { id } = action.payload;

      delete state.prices[id];
    },
    resetCart: (state) => {
      state.items = [];
      state.prices = {};
    },
  },
});

export const {
  addItem,
  removeItem,
  setSelectedPackage,
  setSelectedStock,
  setPrice,
  removePrice,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
