import { createSelector } from '@reduxjs/toolkit';

import { calculatePrice } from '@helpers/calculatePrice';
import { RootState } from '@store/store';
import { IProduct } from '@utils/product/product';

const selectAllProducts = (state: RootState) => state.products.products;

export const selectPriceRange = createSelector(
  [selectAllProducts],
  (products: IProduct[]) => {
    const pricesWithDiscount = products.map((product) => {
      const discountedPrice = calculatePrice(
        product.price.kgs,
        product.discount,
      );

      return +discountedPrice;
    });
    const minPrice = Math.min(...pricesWithDiscount);
    const maxPrice = Math.max(...pricesWithDiscount);

    return { minPrice, maxPrice };
  },
);
