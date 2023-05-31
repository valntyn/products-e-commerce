import { useAppSelector } from '@hooks/useAppSelector';
import { selectProductsForCart } from '@store/selectors/selectCartItemsById';

import { CheckoutProduct } from './CheckoutProduct';

import './CheckoutList.scss';

export const CheckoutList = () => {
  const productsForCart = useAppSelector(selectProductsForCart);

  return (
    <ul className="checkout-list">
      {productsForCart.map(item => (
        <CheckoutProduct product={item} key={item.id} />
      ))}
    </ul>
  );
};
