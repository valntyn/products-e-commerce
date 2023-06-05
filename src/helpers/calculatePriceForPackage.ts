import { ProductForCart } from '@utils/product/productForCart';

import { calculatePrice } from './calculatePrice';

export const calculatePriceForPackage = (
  cartItems: ProductForCart[],
  visibleProducts: ProductForCart[],
): number => {
  const selectedItems = cartItems.filter(item => item.selectedPackage);
  let totalPrice = 0;

  selectedItems.forEach(item => {
    const selectedProduct = visibleProducts
      .find(product => product.productId === item.productId);

    const selectedPackagePrice = selectedProduct?.price[item.selectedPackage];
    const discount = selectedProduct?.discount || 0;

    if (selectedProduct && typeof selectedPackagePrice === 'number') {
      const fixedItemPrice = +calculatePrice(selectedPackagePrice, discount);

      if (!Number.isNaN(fixedItemPrice)) {
        totalPrice += fixedItemPrice * item.selectedStock;
      }
    }
  });

  return totalPrice;
};
