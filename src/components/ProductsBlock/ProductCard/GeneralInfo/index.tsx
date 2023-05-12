import { Link } from 'react-router-dom';

import { IProduct } from '@utils/product';

import './GeneralInfo.scss';
import { Stars } from '../Stars';

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
      <Stars rating={rating} />
      <div className="general__box">
        <ul className="general__list-info">
          <li className="general__item">
            <p className="general__key">Fresheness</p>
            <p className="general__value general__value--word">{fresheness}</p>
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
