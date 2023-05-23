import { useEffect } from 'react';
import { useParams } from 'react-router';

import { Spinner } from '@components/UI/Spinner';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { getSingleProduct } from '@store/reducers/productsSlice';

import './ProductPage.scss';

export const ProductPage = () => {
  const dispatch = useAppDispatch();

  const { id: productId = '' } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  const { isSelectedProductLoading } = useAppSelector(state => state.products);

  if (isSelectedProductLoading) {
    return <Spinner />;
  }

  return (
    <div>ProductPage</div>
  );
};
