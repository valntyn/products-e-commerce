import { memo } from 'react';

import { calculatePrice } from '@helpers/calculatePrice';
import { IProduct } from '@utils/product/product';

import './PriceShipping.scss';

type PropTypes = {
  product: IProduct;
};

export const PriceShipping: React.FC<PropTypes> = memo(
  ({ product: { price, discount, time } }) => {
    const fixedPrice = calculatePrice(price.kgs, discount);

    return (
      <div className="price">
        <div className="price__left-box">
          <p className="price__new-price">{`${fixedPrice} USD`}</p>
          <p className="price__old">{`${price.kgs} USD`}</p>
        </div>
        <div className="price__right-box">
          <p className="price__shipping">Free Shipping</p>
          <p className="price__time">{`Delivery in ${time} days`}</p>
        </div>
      </div>
    );
  },
);
