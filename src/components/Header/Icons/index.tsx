import classNames from 'classnames';

import { ReactComponent as Basket } from '@assets/svg/basket.svg';
import { ReactComponent as User } from '@assets/svg/user.svg';
import { useAppSelector } from '@hooks/useAppSelector';

import './Icons.scss';

export const Icons = () => {
  const { itemInFavorite } = useAppSelector(state => state.favorite);

  return (
    <div className="icons">
      <button
        type="button"
        className={classNames(
          'icons__button',
          { 'icons__button--favorite': itemInFavorite.length },
        )}
        data-count-favorite={itemInFavorite.length}
      >
        <User className="icons__svg" />
      </button>
      <button
        type="button"
        className="icons__button icons__button--basket"
        data-count-cart={4}
      >
        <Basket className="icons__svg" />
      </button>
    </div>
  );
};
