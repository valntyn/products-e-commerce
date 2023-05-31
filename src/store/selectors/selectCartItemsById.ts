import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';
import { ProductForCart } from '@utils/product/productForCart';

const selectCartItems = (state: RootState) => state.cart.items;
const selectProducts = (state: RootState) => state.products.products;

export const selectProductsForCart = createSelector(
  [selectCartItems, selectProducts],
  (cartItems, products) => {
    if (!products.length) {
      return cartItems;
    }

    const productsForCart: ProductForCart[] = [];

    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);

      if (product) {
        const {
          title,
          brand,
          price,
          discount,
          time,
          stock,
          rating,
          img,
        } = product;

        const productForCart: ProductForCart = {
          title,
          brand,
          price,
          discount,
          time,
          stock,
          rating,
          img,
          id: product.id,
          selectedStock: cartItem.selectedStock,
          selectedPackage: cartItem.selectedPackage,
        };

        productsForCart.push(productForCart);
      }
    });

    return productsForCart.reverse();
  },
);
