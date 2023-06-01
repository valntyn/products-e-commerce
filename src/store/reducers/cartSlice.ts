/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProductForCart } from '@utils/product/productForCart';

type ProductsForCatType = {
  items: ProductForCart[];
  isModalOpen: boolean;
};

type MergedProducts = {
  [productId: string]: ProductForCart;
};

const initialState: ProductsForCatType = {
  items: [],
  isModalOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productId, selectedStock } = action.payload;

      const existingProduct = state.items.find(
        (item) => item.productId === productId,
      );

      if (existingProduct) {
        existingProduct.selectedStock += selectedStock;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items
        .filter((obj) => obj.productId !== action.payload);
    },
    setSelectedStock: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.productId === id);

      if (product) {
        product.selectedStock = quantity;
      }
    },
    setSelectedPackage: (
      state,
      action: PayloadAction<{
        id: string;
        typeOfPack: string;
        productId: string;
      }>,
    ) => {
      const { id, typeOfPack, productId } = action.payload;
      const product = state.items.find((item) => item.productId === id);

      if (product) {
        product.selectedPackage = typeOfPack;
        product.productId = productId;
      }
    },
    mergeProducts: (state) => {
      const mergedProducts: MergedProducts = {};

      state.items.forEach((item) => {
        const { productId, selectedStock } = item;

        if (mergedProducts[productId]) {
          mergedProducts[productId].selectedStock += selectedStock;
        } else {
          mergedProducts[productId] = { ...item };
        }
      });

      state.items = Object.values(mergedProducts);
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  setSelectedPackage,
  setSelectedStock,
  resetCart,
  mergeProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
