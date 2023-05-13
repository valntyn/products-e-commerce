/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ReactComponent as StarFilled,
} from '@assets/svg/star-sidebar-filled.svg';
import { ReactComponent as StarEmpty } from '@assets/svg/star-sidebar.svg';
import { Stars } from '@components/UI/Stars';

import './Rating.scss';
import { Checkbox } from '../Checkbox';

export const Rating = () => {
  const stars = [];

  for (let i = 5; i >= 1; i -= 1) {
    stars.push(
      <li className="rating__item" key={i}>
        <label className="rating__label">
          <Checkbox />
          <Stars
            number={i}
            inactiveStarIcon={StarEmpty}
            activeStarIcon={StarFilled}
          />
        </label>
      </li>,
    );
  }

  return (
    <div className="rating">
      <h2 className="rating__title">Rating</h2>
      <ul className="rating__list">{stars}</ul>
    </div>
  );
};
