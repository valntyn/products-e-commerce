import { ReactComponent as EmptyCart } from '@assets/svg/cart-img.svg';
import { Spinner } from '@components/UI/Spinner';
import { useAppSelector } from '@hooks/useAppSelector';

import { CheckoutList } from './CheckoutList/CheckoutList';
import { CheckoutPrice } from './СheckoutPrice';

import './CheckoutOrderBlock.scss';

export const CheckoutOrderBlock = () => {
  const { isLoading } = useAppSelector(
    (state) => state.products,
  );
  const { items } = useAppSelector((state) => state.cart);

  if (isLoading) {
    return (
      <div className="order-block">
        <Spinner />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="order-block">
        <h2 className="order-block__title">Order Summary</h2>
        <p className="order-block__desc">
          Your cart is empty, come back here when you add some items
        </p>
        <div className="order-block__empty">
          <EmptyCart className="order-block__cart" />
        </div>
      </div>
    );
  }

  return (
    <div className="order-block">
      <h2 className="order-block__title">Order Summary</h2>
      <p className="order-block__desc">
        Price can change depending on shipping method and taxes of your state.
      </p>
      <CheckoutList />
      <CheckoutPrice />
    </div>
  );
};
