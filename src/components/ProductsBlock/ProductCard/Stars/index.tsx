/* eslint-disable react/no-array-index-key */
import { ReactComponent as FilledStar } from '@assets/svg/star-filled.svg';
import { ReactComponent as EmptyStar } from '@assets/svg/star.svg';

import './Stars.scss';

type PropTypes = {
  rating: number;
};

export const Stars: React.FC<PropTypes> = ({ rating }) => {
  const fixedRating = +rating.toFixed();
  const filledStars = Array(fixedRating).fill(<FilledStar />);
  const emptyStars = Array(5 - fixedRating).fill(<EmptyStar />);

  const stars = filledStars.concat(emptyStars);

  return (
    <ul className="stars">
      {stars.map((star, i) => (
        <li className="stars__star" key={i}>
          {star}
        </li>
      ))}
    </ul>
  );
};
