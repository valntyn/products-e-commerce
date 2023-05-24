import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NO_IMG } from '@constants/card';
import { paths } from '@constants/paths';

import './CardImage.scss';

type PropTypes = {
  img: string[];
  id: string;
};

export const CardImage: React.FC<PropTypes> = memo(({ img, id }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `${paths.products}/${id}`,
        search: location.search,
      }}
      className="img-card"
    >
      <img
        src={img[0] || NO_IMG}
        alt="good-product-food"
        className="img-card__img"
      />
    </Link>
  );
});
