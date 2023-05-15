import { useWindowWidth } from '@hooks/useWindowWidth';

import { ProductsList } from './ProductsList';
import { Sidebar } from './Sidebar';

import './ProductsBlock.scss';

export const ProductsBlock = () => {
  const windowWidth = useWindowWidth();
  const desktopWidth = 1080;

  return (
    <div className="products-block">
      {windowWidth >= desktopWidth && <Sidebar />}
      <ProductsList />
    </div>
  );
};
