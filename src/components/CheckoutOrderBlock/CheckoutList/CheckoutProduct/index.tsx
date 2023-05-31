import { useCallback, useEffect, useState } from 'react';

import { QntyPanel } from '@components/QntyPanel';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  setSelectedPackage, setSelectedStock,
} from '@store/reducers/cartSlice';
import { ProductForCart } from '@utils/product/productForCart';
import { Stock } from '@utils/product/stock';

import { CartCardManipulation } from './CartCardManipulation';
import { GeneralCartInfo } from './GeneralCartInfo.ts';

import './CheckoutProduct.scss';

type PropTypes = {
  product: ProductForCart;
};

export const CheckoutProduct: React.FC<PropTypes> = ({ product }) => {
  const {
    selectedStock,
    stock,
    price,
    selectedPackage,
    id,
  } = product;

  const dispatch = useAppDispatch();

  const [typeOfPack, selectTypeOfPack] = useState<keyof Stock | null>(null);
  const [visiblePrice, setVisiblePrice] = useState(0);
  const [quantity, setQuantity] = useState(selectedStock);
  const [error, setError] = useState('');

  const availableStock = stock ? stock[typeOfPack as keyof Stock] : 0;
  const stockKeys = stock && Object.keys(stock);

  useEffect(() => {
    if (stockKeys && selectedStock) {
      selectTypeOfPack(selectedPackage as keyof Stock);
      setVisiblePrice(price ? price[selectedPackage as keyof Stock] : 0);
    }
  }, []);

  useEffect(() => {
    dispatch(setSelectedStock({ id, quantity }));
  }, [dispatch, id, quantity]);

  const handleSelectTypeOfPackage = useCallback(
    (type: keyof Stock) => {
      selectTypeOfPack(type);
      setVisiblePrice(price ? price[type] : 0);
      dispatch(setSelectedPackage({ id, typeOfPack: type }));
    },
    [dispatch, id, price],
  );

  return (
    <li className="check-product">
      <CartCardManipulation
        product={product}
      />
      <GeneralCartInfo
        product={product}
        quantity={quantity}
        price={visiblePrice}
      />
      <div className="check-product__dropdown-menu">
        <QntyPanel
          setQuantity={setQuantity}
          quantity={quantity}
          handleSelectTypeOfPackage={handleSelectTypeOfPackage}
          typeOfPack={typeOfPack}
          setError={setError}
          error={error}
          selectedStock={availableStock}
          stockKeys={stockKeys}
        />
      </div>
    </li>
  );
};
