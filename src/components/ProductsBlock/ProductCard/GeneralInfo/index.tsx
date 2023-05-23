import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as FilledStar } from '@assets/svg/star-filled.svg';
import { ReactComponent as EmptyStar } from '@assets/svg/star.svg';
import { Stars } from '@components/UI/Stars';
import { paths } from '@constants/paths';
import { IProduct } from '@utils/product';

import './GeneralInfo.scss';

type PropTypes = {
  product: IProduct;
};

export const GeneralInfo: React.FC<PropTypes> = ({
  product: {
    title,
    description,
    delivery,
    brand,
    stock,
    fresheness,
    rating,
    id,
  },
}) => {
  const location = useLocation();

  const descriptionCard = {
    Freshness: (
      <>
        <span className="general__value--green">New</span>
        {` ${fresheness}`}
      </>
    ),
    Farm: brand,
    Delivery: delivery,
    Stock: `${stock} kgs`,
  };

  return (
    <div className="general">
      <Link
        to={{
          pathname: `${paths.products}/${id}`,
          search: location.search,
        }}
      >
        <h2 className="general__title">{title}</h2>
      </Link>
      <p className="general__desc">{description}</p>
      <div className="general__stars">
        <Stars
          number={rating}
          activeStarIcon={FilledStar}
          inactiveStarIcon={EmptyStar}
        />
      </div>
      <div className="general__box">
        <ul className="general__list-info">
          {Object.entries(descriptionCard).map(([key, value]) => (
            <li className="general__item" key={key}>
              <p className="general__key">{key}</p>
              <p className="general__value">{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
