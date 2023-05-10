import { IProduct } from '@utils/product';

import { Buttons } from './Buttons';
import { CardImage } from './CardImage';
import { GeneralInfo } from './GeneralInfo';
import { PriceShipping } from './PriceShipping';

import './ProductCard.scss';

type PropTypes = {
  product: IProduct;
};

export const ProductCard: React.FC<PropTypes> = ({ product }) => {
  return (
    <li className="product">
      <CardImage img={product.img} />
      <div className="product__info">
        <GeneralInfo product={product} />
        <div className="product__right-box">
          <PriceShipping product={product} />
          <Buttons />
        </div>
      </div>
    </li>
  );
};
