import { ProductDesc } from './ProductDesc';
import { ProductImages } from './ProductImages';

import './ProductBlock.scss';

export const ProductBlock = () => (
  <div className="product-block">
    <ProductImages />
    <ProductDesc />
  </div>
);
