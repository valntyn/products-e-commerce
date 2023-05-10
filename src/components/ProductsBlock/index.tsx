import { useAppSelector } from '@hooks/useAppSelector';

import { ProductsList } from './ProductsList';
import { Sidebar } from './Sidebar';

import './ProductsBlock.scss';

export const ProductsBlock = () => {
  const { products, isLoading } = useAppSelector(state => state.products);

  return (
    <div className="products-block">
      <Sidebar />
      <ProductsList products={products} isLoading={isLoading} />
    </div>
  );
};
