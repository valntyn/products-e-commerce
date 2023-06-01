import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import { ReactComponent as Cross } from '@assets/svg/green-cross.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { QntyPanel } from '@components/QntyPanel';
import { DEFAULT_QNTY } from '@constants/default';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { addItem } from '@store/reducers/cartSlice';
import { Price } from '@utils/product/price';
import { Stock } from '@utils/product/stock';

import { PricePanel } from './PricePanel';

import './ProductDisplay.scss';

export const ProductDisplay = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct } = useAppSelector((state) => state.products);
  const { items } = useAppSelector(state => state.cart);

  const [typeOfPack, selectTypeOfPack] = useState<keyof Stock | null>(null);
  const [visiblePrice, setVisiblePrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(DEFAULT_QNTY);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const {
    price = null,
    stock,
    id,
    title,
  } = selectedProduct || {};

  const isProductInCart = items.some(item => item.id === id);

  const selectedStock = stock ? stock[typeOfPack as keyof Stock] : 0;
  const stockKeys = stock && Object.keys(stock);

  useEffect(() => {
    if (stockKeys && price) {
      selectTypeOfPack(stockKeys[0] as keyof Stock);
      setVisiblePrice(price[stockKeys[0] as keyof Price]);
    }
  }, []);

  useEffect(() => {
    const timeoutId
      = notification && setTimeout(() => setNotification(''), 1000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  const handleSelectTypeOfPackage = useCallback(
    (type: keyof Stock) => {
      selectTypeOfPack(type);
      setVisiblePrice(price ? price[type] : 0);
    },
    [price],
  );

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(
        addItem({
          id,
          productId: `${id}-${typeOfPack}`,
          selectedStock: quantity,
          selectedPackage: typeOfPack,
        }),
      );

      setNotification(`Added ${quantity} ${typeOfPack} of ${title}`);
    }
  };

  return (
    <>
      <div className="display">
        <div className="display__box">
          <PricePanel price={visiblePrice} quantity={quantity} />
          <div className="display__right">
            <div className="display__qnt-wrapper">
              <QntyPanel
                setQuantity={setQuantity}
                handleSelectTypeOfPackage={handleSelectTypeOfPackage}
                typeOfPack={typeOfPack}
                setError={setError}
                error={error}
                quantity={quantity}
                stockKeys={stockKeys}
                selectedStock={selectedStock}
                isProduct
              />
            </div>
            <button
              type="button"
              className={classNames(
                'display__button',
              )}
              disabled={!isProductInCart && !quantity}
              onClick={handleAddToCart}
            >
              <Cross
                className={classNames(
                  'display__svg',
                )}
              />
              Add to cart
            </button>
            {notification
              && (
                <p className="display__notification">
                  {notification}
                </p>
              )}
          </div>
        </div>
        <div className="display__wish-box">
          <button className="display__button-wish" type="button">
            <Heart className="display__svg display__svg--heart" />
            Add to my wish list
          </button>
        </div>
      </div>
    </>
  );
};
