import { GeneralProductInfo } from './GeneralProductInfo';
import { ProductDisplay } from './ProductDisplay';

import './ProductDesc.scss';

export const ProductDesc = () => (
  <div className="product-desc">
    <GeneralProductInfo />
    <ProductDisplay />
  </div>
);
