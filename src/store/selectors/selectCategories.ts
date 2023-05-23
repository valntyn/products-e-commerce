import { createSelector } from '@reduxjs/toolkit';

import { getCategories } from '@helpers/getCategories';
import { RootState } from '@store/store';
import { IProduct } from '@utils/product/product';

const selectAllProducts = (state: RootState) => state.products.products;

export const selectCategories = createSelector(
  [selectAllProducts],
  (products: IProduct[]) => {
    const categories = getCategories(products);

    return categories.map((category) => {
      const quantity = products.filter(
        (product) => product.category === category,
      ).length;

      return {
        name: category,
        quantity,
      };
    });
  },
);
