import { SkeletonLoading } from '@components/UI/SkeletonLoading';
import { IProduct } from '@utils/product';

import { ProductCard } from '../ProductCard';

import './ProductsList.scss';

type PropTypes = {
  products: IProduct[];
  isLoading: boolean;
};

export const ProductsList: React.FC<PropTypes> = ({ products, isLoading }) => {
  return (
    <ul className="product-list">
      {isLoading ? (<SkeletonLoading />) : (
        products.map(product => {
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
