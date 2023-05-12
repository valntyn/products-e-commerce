import classNames from 'classnames';

import { ReactComponent as ArrowRight } from '@assets/svg/arrow-right.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { useAppDispatch } from '@hooks/useAppDispatch';
import './Buttons.scss';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from '@store/reducers/favoriteSlice';
import { IProduct } from '@utils/product';

type PropTypes = {
  product: IProduct;
};

export const Buttons: React.FC<PropTypes> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { itemInFavorite } = useAppSelector((state) => state.favorite);

  const isProductInFavorite = itemInFavorite.some(
    (item) => item.id === product.id,
  );

  const handleClick = (item: IProduct) => () => {
    if (isProductInFavorite) {
      dispatch(removeItemFromFavorite(item.id));
    } else {
      dispatch(addItemToFavorite(item));
    }
  };

  return (
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
          { 'product-buttons__wishlist--active': isProductInFavorite },
        )}
        onClick={handleClick(product)}
      >
        <Heart className="product-buttons__svg product-buttons__svg--heart" />
        {isProductInFavorite ? 'Added to list' : 'Add to wish list'}
      </button>
    </div>
  );
};
