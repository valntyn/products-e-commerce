import { useState } from 'react';

import { ReactComponent as Filter } from '@assets/svg/filter.svg';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Menu } from '@components/Menu';
import { ProductsBlock } from '@components/ProductsBlock';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  selectFilteredProducts,
} from '@store/selectors/selectFilteredProducts';

import './ProductsPage.scss';

export const ProductsPage = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { isLoading } = useAppSelector((state) => state.products);

  const visibleProducts = useAppSelector(selectFilteredProducts);

  const handleOpenMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="products-page">
      <Breadcrumbs />
      <div className="products-page__title-box">
        <h1>All products</h1>
        <div className="products-page__box-qty">
          <p className="products-page__quantity">
            {!isLoading && visibleProducts.length}
          </p>
          <p className="products-page__name">Products</p>
        </div>
      </div>
      <div className="products-page__sort-box">
        <div className="products-page__sort">sort by</div>
        <button
          type="button"
          className="products-page__filter"
          onClick={handleOpenMenu}
        >
          <Filter className="products-page__svg" />
        </button>
      </div>
      <ProductsBlock />
      {menuActive && (
        <Menu menuActive={menuActive} setMenuActive={setMenuActive} />
      )}
    </div>
  );
};
