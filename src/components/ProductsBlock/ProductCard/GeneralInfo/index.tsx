import { Link } from 'react-router-dom';

import { ReactComponent as FilledStar } from '@assets/svg/star-filled.svg';
import { ReactComponent as EmptyStar } from '@assets/svg/star.svg';
import { Stars } from '@components/UI/Stars';
import { IProduct } from '@utils/product';

import './GeneralInfo.scss';

type PropTypes = {
  product: IProduct;
};

export const GeneralInfo: React.FC<PropTypes> = ({ product }) => {
  const {
    title, description, delivery, brand, stock, fresheness, rating,
  }
    = product;

  return (
    <div className="general">
      <Link to="/products">
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
          <li className="general__item">
            <p className="general__key">Freshness</p>
            <p className="general__value">
              <span className="general__new">New</span>
              {` ${fresheness}`}
            </p>
          </li>
          <li className="general__item">
            <p className="general__key">Farm</p>
            <p className="general__value">{brand}</p>
          </li>
          <li className="general__item">
            <p className="general__key">Delivery</p>
            <p className="general__value">{delivery}</p>
          </li>
          <li className="general__item">
            <p className="general__key">Stock</p>
            <p className="general__value general__value--green">
              {`${stock} kgs`}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
