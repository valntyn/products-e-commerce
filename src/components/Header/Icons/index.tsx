import classNames from 'classnames';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as Basket } from '@assets/svg/basket.svg';
import { ReactComponent as User } from '@assets/svg/user.svg';
import { paths } from '@constants/paths';
import { useAppSelector } from '@hooks/useAppSelector';

import './Icons.scss';

export const Icons = memo(() => {
  const { items } = useAppSelector(state => state.cart);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(paths.checkout);
  };

  const quantityCart = items.length;

  return (
    <div className="icons">
      <button type="button" className="icons__button">
        <User className="icons__svg" />
      </button>
      <button
        onClick={handleNavigate}
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
