import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { MainWrapper } from '@components/MainWrapper';
import { PageWrapper } from '@components/PageWrapper';
import { paths } from '@constants/paths';

export const Layout = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === paths.main;

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      {isCheckoutPage && <Footer />}
    </PageWrapper>
  );
};
