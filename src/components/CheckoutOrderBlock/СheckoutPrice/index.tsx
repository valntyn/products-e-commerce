import { useState } from 'react';

import { promo } from '@constants/coupons';
import { DEFAULT_TAX } from '@constants/default';
import { calculatePercentage } from '@helpers/calculatePrice';
import { calculatePriceForPackage } from '@helpers/calculatePriceForPackage';
import { formatDate } from '@helpers/formatDays';
import { formatNumber } from '@helpers/formatPrice';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectProductsForCart } from '@store/selectors/selectCartItemsById';

import './CheckoutPrice.scss';

export const CheckoutPrice = () => {
  const [queryPromo, setQueryPromo] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [error, setError] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const { items } = useAppSelector((state) => state.cart);
  const productsForCart = useAppSelector(selectProductsForCart);

  const sum = calculatePriceForPackage(items, productsForCart);
  const fixedDirtSum = formatNumber(sum);
  const calculatedTax = calculatePercentage(DEFAULT_TAX, sum);
  const fixedCalculatedTax = formatNumber(calculatedTax);

  const calculatedPromo = calculatePercentage(promoDiscount, sum);
  const fixedCalculatedPromo = formatNumber(calculatedPromo);

  const totalSum = calculatedTax + sum - calculatedPromo;
  const formatedTotalSum = formatNumber(totalSum);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryPromo(e.target.value);
    setError('');
  };

  const handleApply = () => {
    const lowerCaseQueryPromo = queryPromo.toLowerCase().trim();

    if (!lowerCaseQueryPromo) {
      return;
    }

    const appliedPromoCode = promo.find(
      (item) => item.promo.toLowerCase() === lowerCaseQueryPromo,
    );

    if (appliedPromoCode) {
      setPromoDiscount(appliedPromoCode.discount);
      setAppliedCoupon(appliedPromoCode.promo);
      setQueryPromo('');
      setError('');
    } else {
      setError('coupon not found');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  const maxTimeProduct = productsForCart.reduce((maxTime, currentProduct) => {
    if (currentProduct.time > maxTime) {
      return currentProduct.time;
    }

    return maxTime;
  }, productsForCart[0].time);

  return (
    <div className="checkout-price">
      <ul className="checkout-price__list">
        <li className="checkout-price__item">
          <p>Subtotal</p>
          <p>{fixedDirtSum}</p>
        </li>
        <li className="checkout-price__item">
          <p>Tax</p>
          <p>{`${DEFAULT_TAX}% ${fixedCalculatedTax}`}</p>
        </li>
        {appliedCoupon && (
          <li className="checkout-price__item">
            <p>Applied promo</p>
            <p>{`-${promoDiscount}% ${fixedCalculatedPromo}`}</p>
          </li>
        )}
      </ul>

      <label htmlFor="coupon" className="checkout-price__label">
        <input
          type="text"
          id="coupon"
          value={queryPromo}
          onChange={handleQuery}
          onKeyDown={handleKeyDown}
          className="checkout-price__input"
          placeholder="Apply promo code - COUPON101"
        />
        <button
          onClick={handleApply}
          type="button"
          className="checkout-price__coupon"
        >
          Apply now
        </button>
        {error && <p className="checkout-price__error">{error}</p>}
        {appliedCoupon && (
          <p className="checkout-price__applied-coupon">{`Applied promo ${appliedCoupon}`}</p>
        )}
      </label>

      <div className="checkout-price__lower-box">
        <div className="checkout-price__left-box">
          <p className="checkout-price__order">Total Order</p>
          <p className="checkout-price__date">
            {`Guaranteed delivery day: ${formatDate(maxTimeProduct)}`}
          </p>
        </div>
        <p className="checkout-price__last-price">{formatedTotalSum}</p>
      </div>
    </div>
  );
};
