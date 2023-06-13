import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorNotification } from '@components/ErrorNotification';
import { ProductBlock } from '@components/ProductBlock';
import { Spinner } from '@components/UI/Spinner';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { getSingleProduct } from '@store/reducers/productsSlice';
import { NotFound } from '@utils/not-found';

import './ProductPage.scss';

const ProductPage = () => {
  const dispatch = useAppDispatch();

  const { id: productId = '' } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(productId));

    window.scrollTo(0, 0);
  }, [dispatch, productId]);

  const {
    isSelectedProductLoading,
    isSelectedProductError,
  } = useAppSelector(state => state.products);

  if (isSelectedProductLoading) {
    return <Spinner />;
  }

  if (isSelectedProductError) {
    return <ErrorNotification text={NotFound.PRODUCT} />;
  }

  return (
    <div className="product-page">
      <ProductBlock />
    </div>
  );
};

export default ProductPage;
