import { createSelector } from '@reduxjs/toolkit';

import { getBrands } from '@helpers/getBrands';
import { RootState } from '@store/store';
import { IProduct } from '@utils/product/product';

const selectAllProducts = (state: RootState) => state.products.products;

export const selectBrands = createSelector(
  [selectAllProducts],
  (products: IProduct[]) => {
    return getBrands(products);
  },
);
