import { GeneralProductInfo } from './GeneralProductInfo';
import { ProductDisplay } from './ProductDisplay';
import { ProductTabs } from './ProductTabs';

import './ProductDesc.scss';

export const ProductDesc = () => (
  <div className="product-desc">
    <GeneralProductInfo />
    <ProductDisplay />
    <ProductTabs />
  </div>
);
