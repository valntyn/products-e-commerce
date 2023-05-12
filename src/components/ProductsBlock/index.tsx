import { ProductsList } from './ProductsList';
import { Sidebar } from './Sidebar';

import './ProductsBlock.scss';

export const ProductsBlock = () => {
  return (
    <div className="products-block">
      <Sidebar />
      <ProductsList />
    </div>
  );
};
