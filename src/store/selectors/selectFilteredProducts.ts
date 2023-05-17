import { createSelector } from '@reduxjs/toolkit';

import { calculatePrice } from '@helpers/calculatePrice';
import { RootState } from '@store/store';
import { IProduct } from '@utils/product';
import { SortFilter } from '@utils/sort';

const selectAllProducts = (state: RootState) => state.products.products;
const selectFilter = (state: RootState) => state.filter;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilter],
  (products: IProduct[], filter) => {
    const {
      selectedCategory,
      appliedQuery,
      selectedBrands,
      selectedRating,
      selectedPrice,
      sort,
      isReversed,
    } = filter;

    const filteredProducts = products
      .filter((product) => {
        const fixedPrice = +calculatePrice(product.price, product.discount);

        if (
          selectedCategory !== 'all products'
          && product.category !== selectedCategory
        ) {
          return false;
        }

        if (selectedBrands.length && !selectedBrands.includes(product.brand)) {
          return false;
        }

        if (
          selectedRating.length
          && !selectedRating.includes(product.rating.toString())
        ) {
          return false;
        }

        if (
          selectedPrice[0] !== 0
          && (fixedPrice < selectedPrice[0] || fixedPrice > selectedPrice[1])
        ) {
          return false;
        }

        return true;
      })
      .filter((product) => {
        if (
          appliedQuery
          && !product.title
            .toLowerCase()
            .includes(appliedQuery.toLowerCase().trim().replace(/\s+/g, ' '))
        ) {
          return false;
        }

        return true;
      }).sort((a, b) => {
        const fixedPriceA = +calculatePrice(a.price, a.discount);
        const fixedPriceB = +calculatePrice(b.price, b.discount);

        switch (sort) {
          case SortFilter.Title:
            return a.title.localeCompare(b.title);
          case SortFilter.Price:
            return fixedPriceA - fixedPriceB;
          case SortFilter.Stock:
            return a.stock - b.stock;
          case SortFilter.Rating:
            return a.rating - b.rating;
          default:
            return 0;
        }
      });

    if (isReversed) {
      return filteredProducts.reverse();
    }

    return filteredProducts;
  },
);
