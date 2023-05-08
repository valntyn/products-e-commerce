import { ReactComponent as Basket } from '@assets/svg/basket.svg';
import { ReactComponent as User } from '@assets/svg/user.svg';

import './Icons.scss';

export const Icons = () => {
  return (
    <div className="icons">
      <button
        type="button"
        className="icons__button"
      >
        <User className="icons__svg" />
      </button>
      <button
        type="button"
        className="icons__button icons__button--basket"
        data-count-favorite={4}
      >
        <Basket className="icons__svg" />
      </button>
    </div>
  );
};
