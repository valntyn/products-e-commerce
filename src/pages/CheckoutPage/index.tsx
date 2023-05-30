import { CheckoutForm } from '@components/CheckoutForm';
import { CheckoutOrderBlock } from '@components/CheckoutOrderBlock';

import './CheckoutPage.scss';

export const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <CheckoutForm />
      <CheckoutOrderBlock />
    </div>
  );
};
