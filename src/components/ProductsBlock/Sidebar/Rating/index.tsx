import {
  ReactComponent as StarFilled,
} from '@assets/svg/star-sidebar-filled.svg';
import { ReactComponent as StarEmpty } from '@assets/svg/star-sidebar.svg';
import { Spinner } from '@components/UI/Spinner';
import { Stars } from '@components/UI/Stars';
import { useAppSelector } from '@hooks/useAppSelector';

import { Checkbox } from '../Checkbox';

import './Rating.scss';

export const Rating = () => {
  const { isLoading } = useAppSelector(state => state.products);

  const stars = [];

  if (isLoading) {
    return (
      <div className="rating">
        <h2 className="rating__title">Price</h2>
        <Spinner />
      </div>
    );
  }

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
