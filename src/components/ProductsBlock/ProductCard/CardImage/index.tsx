import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NO_IMG } from '@constants/card';

import './CardImage.scss';

type PropTypes = {
  img: string;
};

export const CardImage: React.FC<PropTypes> = memo(({ img }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        search: location.search,
      }}
      className="img-card"
    >
      <img
        src={img || NO_IMG}
        alt="good-product-food"
        className="img-card__img"
      />
    </Link>
  );
});
