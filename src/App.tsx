import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import './App.scss';

import Layout from '@components/Layout';
import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { CheckoutPage } from '@pages/CheckoutPage';
import { Homepage } from '@pages/Homepage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ProfilePage } from '@pages/ProfilePage';
import { WishlistPage } from '@pages/WishlistPage';
import { getProducts } from '@store/reducers/productsSlice';

const ProductsPage = lazy(() => import('@pages/ProductsPage'));
const ProductPage = lazy(() => import('@pages/ProductPage'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={paths.home} element={<Navigate to="/" replace />} />
        <Route path={paths.products} element={<ProductsPage />} />
        <Route path={paths.product} element={<ProductPage />} />
        <Route path={paths.checkout} element={<CheckoutPage />} />
        <Route path={paths.wishlist} element={<WishlistPage />} />
        <Route path={paths.notFound} element={<NotFoundPage />} />
        <Route path={paths.profile} element={<ProfilePage />} />
        <Route path="*" element={<Navigate to={paths.notFound} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
