import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router';

import { ReactComponent as ArrowRight } from '@assets/svg/arrow-right.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { paths } from '@constants/paths';
import { IProduct } from '@utils/product/product';

import './Buttons.scss';

type PropTypes = {
  product: IProduct;
};

export const Buttons: React.FC<PropTypes> = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${paths.products}/${product.id}${location.search}`);
  };

  return (
    <div className="product-buttons">
      <button
        type="button"
        className="
          product-buttons__button
          product-buttons__detail
        "
        onClick={handleClick}
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
};
