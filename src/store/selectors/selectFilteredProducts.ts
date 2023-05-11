import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';
import { IProduct } from '@utils/product';

const selectAllProducts = (state: RootState) => state.products.products;
const selectCategory = (state: RootState) => state.filter.selectedCategory;
const selectSearch = (state: RootState) => state.filter.appliedQuery;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectCategory, selectSearch],
  (products: IProduct[], selectedCategory: string, searchQuery: string) => {
    const filteredProducts = products.filter((product) => {
      if (selectedCategory !== 'All products'
      && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery && !product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    return filteredProducts;
  },
);
