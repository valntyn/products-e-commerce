import { useLocation } from 'react-router-dom';

import { Breadcrumbs } from '@components/Breadcrumbs';
import { paths } from '@constants/paths';
import { useAppSelector } from '@hooks/useAppSelector';

import './MainWrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const MainWrapper: React.FC<PropTypes> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === paths.main;
  const isNotFoundPage = location.pathname === paths.notFound;

  const { isSelectedProductError } = useAppSelector((state) => state.products);

  const shouldRenderBreadcrumbs
  = !isSelectedProductError && !isHomePage && !isNotFoundPage;

  return (
    <main className="main-wrapper">
      {shouldRenderBreadcrumbs && <Breadcrumbs />}
      {children}
    </main>
  );
};
