import { ProductCarousel } from './ProductCarousel';
import { ProductDesc } from './ProductDesc';
import { ProductImages } from './ProductImages';

import './ProductBlock.scss';

export const ProductBlock = () => (
  <div className="product-block">
    <div className="product-block__info">
      <ProductImages />
      <ProductDesc />
    </div>
    <div className="product-block__carousel">
      <ProductCarousel />
    </div>
  </div>
);
