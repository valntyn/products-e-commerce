import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { paths } from '@constants/paths';
import { calculatePrice } from '@helpers/calculatePrice';
import { IProduct } from '@utils/product/product';

import './SingleCard.scss';

type PropTypes = {
  product: IProduct;
};

export const SingleCard: React.FC<PropTypes> = ({
  product: {
    price,
    discount = 0,
    title,
    description,
    img,
    id,
  },
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fixedPrice = calculatePrice(price.kgs, discount);

  const hanldeNavigate = () => {
    navigate(`${paths.products}/${id}`);
  };

  return (
    <li className="carousel-card">
      <div className="carousel-card__img-box">
        <Link
          to={{
            pathname: `${paths.products}/${id}`,
            search: location.search,
          }}
        >
          <img src={img[0]} alt="card" className="carousel-card__img" />
          {!!discount && (
            <p className="carousel-card__element">{`- ${discount} %`}</p>
          )}
        </Link>
      </div>
      <h3 className="carousel-card__title">
        <Link
          to={{
            pathname: `${paths.products}/${id}`,
            search: location.search,
          }}
        >
          {title}
        </Link>
      </h3>
      <p className="carousel-card__desc">{description}</p>
      <div className="carousel-card__box">
        <div className="carousel-card__price-box">
          <p className="carousel-card__new-price">{`${fixedPrice} USD`}</p>
          <p className="carousel-card__old-price">{`${price.kgs} USD`}</p>
        </div>
        <button
          type="button"
          className="carousel-card__button"
          onClick={hanldeNavigate}
        >
          Buy now
        </button>
      </div>
    </li>
  );
};
