import { useLocation } from 'react-router-dom';

import { Breadcrumbs } from '@components/Breadcrumbs';

import './MainWrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const MainWrapper: React.FC<PropTypes> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <main className="main-wrapper">
      {!isHomePage && <Breadcrumbs />}
      {children}
    </main>
  );
};
