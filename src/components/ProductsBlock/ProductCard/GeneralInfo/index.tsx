import { Link } from 'react-router-dom';

import { CARD_DESC } from '@constants/card';
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
        <ul className="general__left">
          {CARD_DESC.map((titleDesc) => (
            <li className="general__item" key={titleDesc}>
              {titleDesc}
            </li>
          ))}
        </ul>
        <ul className="general__right">
          <li className="general__item">{fresheness}</li>
          <li className="general__item">{brand}</li>
          <li className="general__item">{delivery}</li>
          <li className="general__item general__item--green">
            {`${stock} kgs`}
          </li>
        </ul>
      </div>
    </div>
  );
};
