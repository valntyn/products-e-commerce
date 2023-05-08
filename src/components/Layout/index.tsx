import { Outlet } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { MainWrapper } from '@components/MainWrapper';
import { PageWrapper } from '@components/PageWrapper';

export const Layout = () => {
  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <Footer />
    </PageWrapper>
  );
};
