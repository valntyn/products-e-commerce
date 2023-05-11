import { useSelector } from 'react-redux';

import { SkeletonLoading } from '@components/UI/SkeletonLoading';
import {
  selectFilteredProducts,
} from '@store/selectors/selectFilteredProducts';

import { ProductCard } from '../ProductCard';

import './ProductsList.scss';

type PropTypes = {
  isLoading: boolean;
};

export const ProductsList: React.FC<PropTypes> = ({ isLoading }) => {
  const visibleProducts = useSelector(selectFilteredProducts);

  return (
    <ul className="product-list">
      {isLoading ? (<SkeletonLoading />) : (
        visibleProducts.map(product => {
          return (
            <ProductCard
              product={product}
              key={product.id}
            />
          );
        })
      )}
    </ul>
  );
};
