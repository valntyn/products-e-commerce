import { Navigate, Route, Routes } from 'react-router';

import './App.scss';

import { Layout } from '@components/Layout';
import { paths } from '@constants/paths';
import { CheckoutPage } from '@pages/CheckoutPage';
import { Homepage } from '@pages/Homepage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ProductPage } from '@pages/ProductPage';
import { ProductsPage } from '@pages/ProductsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={paths.home} element={<Navigate to="/" replace />} />
        <Route path={paths.products} element={<ProductsPage />} />
        <Route path={paths.product} element={<ProductPage />} />
        <Route path={paths.checkout} element={<CheckoutPage />} />
        <Route path={paths.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
