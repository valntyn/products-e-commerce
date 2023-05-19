import { useState } from 'react';

import { ReactComponent as Filter } from '@assets/svg/filter.svg';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Menu } from '@components/Menu';
import { PaginationBlock } from '@components/PaginationBlock';
import { ProductsBlock } from '@components/ProductsBlock';
import { Sort } from '@components/Sort';
import { useAppSelector } from '@hooks/useAppSelector';
import './ProductsPage.scss';

export const ProductsPage = () => {
  const [menuActive, setMenuActive] = useState(false);
  const {
    isLoading,
    visibleProducts,
  } = useAppSelector((state) => state.products);

  const quantity = visibleProducts.length;

  const handleOpenMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="products-page">
      <Breadcrumbs />
      <div className="products-page__title-box">
        <h1>All products</h1>
        <div className="products-page__box-qty">
          <p className="products-page__quantity">{!isLoading && quantity}</p>
          <p className="products-page__name">Products on page</p>
        </div>
      </div>
      <div className="products-page__sort-box">
        <Sort />
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
      <PaginationBlock />
    </div>
  );
};
