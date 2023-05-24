import { memo } from 'react';

import { calculatePrice } from '@helpers/calculatePrice';
import { formatNumber } from '@helpers/formatPrice';
import { useAppSelector } from '@hooks/useAppSelector';

import './PricePanel.scss';

type PropTypes = {
  price: number;
  quantity: number;
};

export const PricePanel: React.FC<PropTypes> = memo(({ price, quantity }) => {
  const { selectedProduct } = useAppSelector((state) => state.products);

  const { discount = 0 } = selectedProduct || {};

  const oldPrice = price * quantity;
  const fixedPrice = +calculatePrice(price, discount) * quantity;

  const formattedFixedPrice = formatNumber(fixedPrice);
  const formattedOldPrice = formatNumber(oldPrice);

  return (
    <div className="price-panel">
      <p className="price-panel__new">{formattedFixedPrice}</p>
      <p className="price-panel__old">{formattedOldPrice}</p>
    </div>
  );
});
