/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProductForCart } from '@utils/product/productForCart';
import { Stock } from '@utils/product/stock';

type ProductsForCatType = {
  items: ProductForCart[];
};

type MergedProducts = {
  [productId: string]: ProductForCart;
};

const initialState: ProductsForCatType = {
  items: [],
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
    mergeProducts: (state, action: PayloadAction<{
      tempPack: keyof Stock;
    }>) => {
      const { tempPack } = action.payload;
      const mergedProducts: MergedProducts = {};

      state.items.forEach((item) => {
        const { productId, selectedStock, stock } = item;

        if (mergedProducts[productId]) {
          const currentStock = mergedProducts[productId].selectedStock;
          const availableStock = stock[tempPack];

          if (currentStock + selectedStock > availableStock) {
            mergedProducts[productId].selectedStock = availableStock;
          } else {
            mergedProducts[productId].selectedStock += selectedStock;
          }
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
