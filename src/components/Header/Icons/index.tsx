import classNames from 'classnames';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as Basket } from '@assets/svg/basket.svg';
import { ReactComponent as Favorite } from '@assets/svg/heartIcon.svg';
import { ReactComponent as User } from '@assets/svg/user.svg';
import { paths } from '@constants/paths';
import { useAppSelector } from '@hooks/useAppSelector';

import './Icons.scss';

export const Icons = memo(() => {
  const { items } = useAppSelector(state => state.cart);
  const { itemsInFavorite } = useAppSelector(state => state.wishlist);
  const navigate = useNavigate();

  const handleNavigateCart = () => {
    navigate(paths.checkout);
  };

  const handleNavigateFavorite = () => {
    navigate(paths.wishlist);
  };

  const quantityCart = items.length;
  const quantityFavorite = itemsInFavorite.length;

  return (
    <div className="icons">
      <button type="button" className="icons__button">
        <User className="icons__svg" />
      </button>
      <button
        type="button"
        onClick={handleNavigateFavorite}
        data-count-favorite={quantityFavorite}
        className={classNames(
          'icons__button',
          { 'icons__button--favorite': quantityFavorite },
        )}
      >
        <Favorite
          className="icons__svg"
        />
      </button>
      <button
        onClick={handleNavigateCart}
        type="button"
        className={classNames(
          'icons__button',
          { 'icons__button--basket': quantityCart },
        )}
        data-count-cart={quantityCart}
      >
        <Basket className="icons__svg" />
      </button>
    </div>
  );
});
