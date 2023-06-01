import { Link } from 'react-router-dom';

import {
  ReactComponent as StarFilled,
} from '@assets/svg/star-sidebar-filled.svg';
import { ReactComponent as StarEmpty } from '@assets/svg/star-sidebar.svg';
import { Stars } from '@components/UI/Stars';
import { paths } from '@constants/paths';
import { calculatePrice } from '@helpers/calculatePrice';
import { formatNumber } from '@helpers/formatPrice';
import { ProductForCart } from '@utils/product/productForCart';

import './GeneralCartInfo.scss';

type PropTypes = {
  product: ProductForCart;
  quantity: number;
  price: number;
};

export const GeneralCartInfo: React.FC<PropTypes> = ({
  product: {
    title,
    brand,
    id,
    time,
    discount,
    rating,
  },
  quantity,
  price,
}) => {
  const oldPrice = price * quantity;
  const fixedPrice = +calculatePrice(price, discount) * quantity;

  const formattedFixedPrice = formatNumber(fixedPrice);
  const formattedOldPrice = formatNumber(oldPrice);

  return (
    <div className="general-cart__right-box">
      <h3 className="general-cart__title">
        <Link
          to={{
            pathname: `${paths.products}/${id}`,
          }}
        >
          {title}
        </Link>
      </h3>
      <ul className="general-cart__list">
        <li className="general-cart__item">
          <p className="general-cart__key">Farm:</p>
          <p className="general-cart__value">{brand}</p>
        </li>
        <li className="general-cart__item">
          <p className="general-cart__key">Freshness:</p>
          <p className="general-cart__value">{`${time} days old`}</p>
        </li>
      </ul>
      <div className="general-cart__stars-box">
        <Stars
          number={rating}
          inactiveStarIcon={StarEmpty}
          activeStarIcon={StarFilled}
        />
      </div>
      <div className="general-cart__price-box">
        <p className="general-cart__price">{formattedFixedPrice}</p>
        <p className="general-cart__price-old">{formattedOldPrice}</p>
      </div>
    </div>
  );
};
