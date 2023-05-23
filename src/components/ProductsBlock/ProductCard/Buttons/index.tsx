import classNames from 'classnames';

import { ReactComponent as ArrowRight } from '@assets/svg/arrow-right.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { IProduct } from '@utils/product';

import './Buttons.scss';

type PropTypes = {
  product: IProduct;
};

export const Buttons: React.FC<PropTypes> = () => (
  <div className="product-buttons">
    <button
      type="button"
      className="
          product-buttons__button
          product-buttons__detail
        "
    >
      Product Detail
      <ArrowRight className="product-buttons__svg" />
    </button>
    <button
      type="button"
      className={classNames(
        'product-buttons__button',
        'product-buttons__wishlist',
      )}
    >
      <Heart className="product-buttons__svg product-buttons__svg--heart" />
      Add to wish list
    </button>
  </div>
);
