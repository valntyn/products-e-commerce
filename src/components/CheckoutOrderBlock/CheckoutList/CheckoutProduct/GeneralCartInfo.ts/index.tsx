import { useEffect } from 'react';

import {
  ReactComponent as StarFilled,
} from '@assets/svg/star-sidebar-filled.svg';
import {
  ReactComponent as StarEmpty,
} from '@assets/svg/star-sidebar.svg';
import { Stars } from '@components/UI/Stars';
import { calculatePrice } from '@helpers/calculatePrice';
import { formatNumber } from '@helpers/formatPrice';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setPrice } from '@store/reducers/cartSlice';
import { ProductForCart } from '@utils/product/productForCart';

import './GeneralCartInfo.scss';

type PropTypes = {
  product: ProductForCart;
  quantity: number;
  price: number;
};

export const GeneralCartInfo: React.FC<PropTypes> = ({
  product,
  quantity,
  price,
}) => {
  const dispatch = useAppDispatch();
  const {
    brand,
    title,
    discount,
    id,
    time,
  } = product;

  const oldPrice = price * quantity;
  const fixedPrice = +calculatePrice(price, discount) * quantity;

  const formattedFixedPrice = formatNumber(fixedPrice);
  const formattedOldPrice = formatNumber(oldPrice);

  useEffect(() => {
    dispatch(setPrice({ id, fixedPrice }));
  }, [quantity, dispatch, id, fixedPrice]);

  return (
    <div className="general-cart__right-box">
      <h3 className="general-cart__title">{title}</h3>
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
          number={product.rating}
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
