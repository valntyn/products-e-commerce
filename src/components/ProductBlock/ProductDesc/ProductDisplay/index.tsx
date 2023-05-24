import { useEffect, useState } from 'react';

import { ReactComponent as Cross } from '@assets/svg/green-cross.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { DEFAULT_QNTY } from '@constants/default';
import { useAppSelector } from '@hooks/useAppSelector';
import { Price } from '@utils/product/price';
import { Stock } from '@utils/product/stock';

import { PricePanel } from './PricePanel';
import { QntyPanel } from './QntyPanel';

import './ProductDisplay.scss';

export const ProductDisplay = () => {
  const { selectedProduct } = useAppSelector((state) => state.products);

  const [typeOfPack, selectTypeOfPack] = useState<keyof Stock | null>(null);
  const [visiblePrice, setVisiblePrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(DEFAULT_QNTY);
  const [error, setError] = useState('');

  const { price = null, stock } = selectedProduct || {};
  const stockKeys = stock && Object.keys(stock);

  useEffect(() => {
    if (stockKeys && price) {
      selectTypeOfPack(stockKeys[0] as keyof Stock);
      setVisiblePrice(price[stockKeys[0] as keyof Price]);
    }
  }, []);

  const handleSelectTypeOfPackage = (type: keyof Stock) => {
    selectTypeOfPack(type);
    setVisiblePrice(price ? price[type] : 0);
  };

  return (
    <>
      <div className="display">
        <div className="display__box">
          <PricePanel price={visiblePrice} quantity={quantity} />
          <div className="display__right">
            <QntyPanel
              setQuantity={setQuantity}
              handleSelectTypeOfPackage={handleSelectTypeOfPackage}
              typeOfPack={typeOfPack}
              setError={setError}
              error={error}
            />
            <button
              type="button"
              className="display__button"
              disabled={!quantity}
            >
              <Cross className="display__svg" />
              Add to cart
            </button>
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
