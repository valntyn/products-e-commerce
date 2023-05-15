import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from '@assets/svg/logo.svg';

import { Icons } from '../Icons';
import { SearchBar } from '../SearchBar';

import './MainBlock.scss';

export const MainBlock = () => {
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  return (
    <div className="header-main">
      <Link
        to={{
          pathname: '/',
          search: location.search,
        }}
        className="header-main__link"
      >
        <Logo className="header-main__logo" />
      </Link>
      {isProductsPage && <SearchBar />}
      <Icons />
    </div>
  );
};
