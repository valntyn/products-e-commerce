import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { MainWrapper } from '@components/MainWrapper';
import { PageWrapper } from '@components/PageWrapper';
import { LoadingBar } from '@components/UI/LoadingBar';
import { paths } from '@constants/paths';

const Layout = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === paths.checkout;

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Suspense fallback={<LoadingBar />}>
          <Outlet />
        </Suspense>
      </MainWrapper>
      {!isCheckoutPage && <Footer />}
    </PageWrapper>
  );
};

export default Layout;
