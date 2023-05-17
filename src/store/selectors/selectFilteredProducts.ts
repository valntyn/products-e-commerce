import { createSelector } from "@reduxjs/toolkit";

import { calculatePrice } from "@helpers/calculatePrice";
import { RootState } from "@store/store";
import { IProduct } from "@utils/product";

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
    } = filter;

    return products
      .filter((product) => {
        const fixedPrice = +calculatePrice(product.price, product.discount);

        if (
          selectedCategory !== "all products" &&
          product.category !== selectedCategory
        ) {
          return false;
        }

        if (selectedBrands.length && !selectedBrands.includes(product.brand)) {
          return false;
        }

        if (
          selectedRating.length &&
          !selectedRating.includes(product.rating.toString())
        ) {
          return false;
        }

        if (
          selectedPrice[0] !== 0 &&
          (fixedPrice < selectedPrice[0] || fixedPrice > selectedPrice[1])
        ) {
          return false;
        }

        return true;
      })
      .filter((product) => {
        if (
          appliedQuery &&
          !product.title
            .toLowerCase()
            .includes(appliedQuery.toLowerCase().trim().replace(/\s+/g, " "))
        ) {
          return false;
        }

        return true;
      });
  }
);
