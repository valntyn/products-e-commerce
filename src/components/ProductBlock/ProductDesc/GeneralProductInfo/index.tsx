import { ReactComponent as FilledStar } from '@assets/svg/star-filled.svg';
import { ReactComponent as EmptyStar } from '@assets/svg/star.svg';
import { Stars } from '@components/UI/Stars';
import { capitalize } from '@helpers/capitalize';
import { useAppSelector } from '@hooks/useAppSelector';

import './GeneralProductInfo.scss';

export const GeneralProductInfo = () => {
  const { selectedProduct } = useAppSelector((state) => state.products);

  const {
    rating = 0,
    category = '',
    stock,
    delivery,
    time,
    reviews,
    description,
    country,
    color,
  } = selectedProduct || {};

  const qntyReviews = reviews?.length;
  const stockKeys = stock && Object.keys(stock).join(', ');

  const descriptionInfo = {
    Country: country,
    Category: capitalize(category),
    Stock: stock ? 'In stock' : 'Out of stock',
    Color: color,
    Size: 'all sizes',
    'Buy by': stockKeys,
    Delivery: `in ${time} days`,
    'Delivery area': delivery,
  };

  return (
    <div className="general-info">
      <h1 className="general-info__title">{selectedProduct?.title}</h1>
      <div className="general-info__rating-box">
        <Stars
          number={rating}
          activeStarIcon={FilledStar}
          inactiveStarIcon={EmptyStar}
        />
        <p className="general-info__rating-qnty">
          {qntyReviews && `(${qntyReviews} customer reviews)`}
        </p>
      </div>
      <p className="general-info__desc-full">{description}</p>
      <ul className="general-info__desc-list">
        {Object.entries(descriptionInfo).map(([key, value]) => (
          <li className="general-info__item" key={key}>
            <p className="general-info__key">{`${key}:`}</p>
            <p className="general-info__value">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
