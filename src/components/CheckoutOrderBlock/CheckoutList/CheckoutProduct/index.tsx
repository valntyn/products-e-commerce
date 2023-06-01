import { useCallback, useEffect, useState } from 'react';

import { Modal } from '@components/Modal';
import { QntyPanel } from '@components/QntyPanel';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  mergeProducts,
  setSelectedPackage,
  setSelectedStock,
} from '@store/reducers/cartSlice';
import { selectProductsForCart } from '@store/selectors/selectCartItemsById';
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
    selectedStock, stock, price, selectedPackage, id, productId,
  }
    = product;

  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(selectProductsForCart);

  const [typeOfPack, selectTypeOfPack] = useState<keyof Stock | null>(null);
  const [tempPack, selectTempPack] = useState<keyof Stock | null>(null);
  const [visiblePrice, setVisiblePrice] = useState(0);
  const [quantity, setQuantity] = useState(selectedStock);
  const [error, setError] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);

  const availableStock = stock ? stock[typeOfPack as keyof Stock] : 0;
  const stockKeys = stock && Object.keys(stock);

  useEffect(() => {
    if (stockKeys && selectedStock) {
      selectTypeOfPack(selectedPackage as keyof Stock);
      setVisiblePrice(price ? price[selectedPackage as keyof Stock] : 0);
    }
  }, []);

  console.log(quantity);

  useEffect(() => {
    setQuantity(selectedStock);
  }, [selectedStock, tempPack]);

  useEffect(() => {
    dispatch(setSelectedStock({ id: productId, quantity }));
  }, [dispatch, productId, quantity, selectedPackage]);

  const handleSelectTypeOfPackage = useCallback(
    (type: keyof Stock) => {
      const isTypeExist = productsInCart.some(
        (el) => el.productId === `${id}-${type}`,
      );

      if (isTypeExist) {
        setIsModalActive(true);
        selectTempPack(type);
      } else {
        setVisiblePrice(price ? price[type] : 0);
        dispatch(
          setSelectedPackage({
            id: productId,
            typeOfPack: type,
            productId: `${id}-${type}`,
          }),
        );
      }
    },
    [dispatch, productId, price, id, selectedPackage],
  );

  const handleApprove = () => {
    selectTypeOfPack(tempPack);

    if (tempPack) {
      dispatch(
        setSelectedPackage({
          id: productId,
          typeOfPack: tempPack,
          productId: `${id}-${tempPack}`,
        }),
      );
      setVisiblePrice(price ? price[tempPack] : 0);
      dispatch(mergeProducts());
    }

    setIsModalActive(false);
  };

  const hanldeCloseModal = () => {
    setIsModalActive(false);
  };

  return (
    <li className="check-product">
      <CartCardManipulation product={product} />
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
      {isModalActive && (
        <Modal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        >
          <div className="check-product__notify-wrapper">
            <p className="check-product__notify-message">
              You have an item in your cart with the selected package already.
              Do you want to merge them?
            </p>
            <div className="check-product__notify-box">
              <button
                type="button"
                className="check-product__button"
                onClick={handleApprove}
              >
                Of course
              </button>
              <button
                type="button"
                className="check-product__button"
                onClick={hanldeCloseModal}
              >
                Nope
              </button>
            </div>
          </div>
        </Modal>
      )}
    </li>
  );
};
