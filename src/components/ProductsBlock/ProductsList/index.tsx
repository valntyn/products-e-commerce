import { useSelector } from 'react-redux';

import { SkeletonLoading } from '@components/UI/SkeletonLoading';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  selectFilteredProducts,
} from '@store/selectors/selectFilteredProducts';

import { ProductCard } from '../ProductCard';

import './ProductsList.scss';

export const ProductsList = () => {
  const { isLoading, products } = useAppSelector(state => state.products);

  const visibleProducts = useSelector(selectFilteredProducts);

  if (!isLoading && !visibleProducts.length && products.length) {
    return (
      <div className="product-list">
        <h2 className="product-list__n-title">
          There are no such products in our store
        </h2>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        visibleProducts.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })
      )}
    </ul>
  );
};
