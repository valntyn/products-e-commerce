import { useLocation } from 'react-router-dom';

import { Breadcrumbs } from '@components/Breadcrumbs';
import { paths } from '@constants/paths';

import './MainWrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const MainWrapper: React.FC<PropTypes> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === paths.main;
  const isNotFoundPage = location.pathname === paths.notFound;

  return (
    <main className="main-wrapper">
      {!isHomePage && !isNotFoundPage && <Breadcrumbs />}
      {children}
    </main>
  );
};
