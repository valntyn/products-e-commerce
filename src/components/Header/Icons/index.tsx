import { memo } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as Basket } from '@assets/svg/basket.svg';
import { ReactComponent as User } from '@assets/svg/user.svg';
import { paths } from '@constants/paths';

import './Icons.scss';

export const Icons = memo(() => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(paths.checkout);
  };

  return (
    <div className="icons">
      <button type="button" className="icons__button">
        <User className="icons__svg" />
      </button>
      <button
        onClick={handleNavigate}
        type="button"
        className="icons__button icons__button--basket"
        data-count-cart={4}
      >
        <Basket className="icons__svg" />
      </button>
    </div>
  );
});
