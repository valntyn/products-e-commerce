import { useCallback, useEffect, useState } from 'react';

import { ApprovalModal } from '@components/ApprovalModal';
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

export const CheckoutProduct: React.FC<PropTypes> = ({
  product,
  product: {
    selectedStock, stock, price, selectedPackage, id, productId,
  },
}) => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(selectProductsForCart);

  const [typeOfPack, selectTypeOfPack] = useState<keyof Stock | null>(null);
  const [tempPack, selectTempPack] = useState<keyof Stock | null>(null);
  const [visiblePrice, setVisiblePrice] = useState(0);
  const [quantity, setQuantity] = useState(selectedStock);
  const [error, setError] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [notification, setNotification] = useState('');

  const availableStock = stock ? stock[typeOfPack as keyof Stock] : 0;
  const stockKeys = stock && Object.keys(stock);

  useEffect(() => {
    if (stockKeys && selectedStock) {
      selectTypeOfPack(selectedPackage as keyof Stock);
      setVisiblePrice(price ? price[selectedPackage as keyof Stock] : 0);
    }
  }, []);

  useEffect(() => {
    setQuantity(selectedStock);
  }, [selectedStock, tempPack]);

  useEffect(() => {
    dispatch(setSelectedStock({ id: productId, quantity }));
  }, [dispatch, productId, quantity, selectedPackage]);

  const handleSelectTypeOfPackage = useCallback(
    (type: keyof Stock) => {
      const existedProduct = productsInCart.find(
        (el) => el.productId === `${id}-${type}`,
      );
      const isTheSameType = type === selectedPackage;

      setNotification('');

      if (isTheSameType) {
        return;
      }

      if (existedProduct) {
        const anotherAvailbaleQnty = existedProduct.stock[type];
        const anotherProductQnty = existedProduct.selectedStock;
        const difference = anotherAvailbaleQnty - anotherProductQnty;
        const sumOfMerge = anotherProductQnty + selectedStock;

        if (sumOfMerge > anotherAvailbaleQnty) {
          setNotification(
            `you can merge only ${difference}${selectedPackage}(s) to ${type}`,
          );
        }

        if (!difference) {
          setNotification(
            `you can not merge, in stock only ${anotherAvailbaleQnty}${type}(s)`,
          );
        }

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
    [
      productsInCart,
      selectedPackage,
      id,
      selectedStock,
      price,
      dispatch,
      productId,
    ],
  );

  const hanldeCloseModal = () => {
    setIsModalActive(false);
    selectTempPack(null);
  };

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
      dispatch(mergeProducts({ tempPack }));
    }

    hanldeCloseModal();
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
          <ApprovalModal
            handleApprove={handleApprove}
            handleDismiss={hanldeCloseModal}
            message="You have an item in your cart with
            the selected package already.
            Do you want to merge them?"
            error={notification}
          />
        </Modal>
      )}
    </li>
  );
};
