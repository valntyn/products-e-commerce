import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Cross } from '@assets/svg/green-cross.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { ApprovalModal } from '@components/ApprovalModal';
import { Modal } from '@components/Modal';
import { QntyPanel } from '@components/QntyPanel';
import { DEFAULT_QNTY } from '@constants/default';
import { paths } from '@constants/paths';
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
  const { items } = useAppSelector((state) => state.cart);

  const [typeOfPack, selectTypeOfPack] = useState<keyof Stock | null>(null);
  const [visiblePrice, setVisiblePrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(DEFAULT_QNTY);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    price = null, stock, id, title,
  } = selectedProduct || {};

  const selectedStock = stock ? stock[typeOfPack as keyof Stock] : 0;
  const stockKeys = stock && Object.keys(stock);
  const isProductInCart = items.some((el) => el.id === id);
  const productInCart = items.find(
    (item) => item.productId === `${id}-${typeOfPack}`,
  );
  const itemsInCart = productInCart?.selectedStock;

  useEffect(() => {
    if (stockKeys && price) {
      selectTypeOfPack(stockKeys[0] as keyof Stock);
      setVisiblePrice(price[stockKeys[0] as keyof Price]);
    }
  }, []);

  useEffect(() => {
    const timeoutId
      = notification && setTimeout(() => setNotification(''), 2000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  const clearChecking = () => {
    setError('');
    setIsDisabled(false);
  };

  const handleSelectTypeOfPackage = useCallback(
    (type: keyof Stock) => {
      selectTypeOfPack(type);
      setVisiblePrice(price ? price[type] : 0);
    },
    [price],
  );

  const handeAddingToCart = () => {
    if (productInCart && itemsInCart) {
      const available = selectedStock - itemsInCart;

      if (itemsInCart > selectedStock || quantity > available) {
        setQuantity(available);
        setError(
          `in stock only ${selectedStock}${typeOfPack}, in cart ${itemsInCart}`,
        );

        return;
      }
    }

    if (selectedProduct) {
      dispatch(
        addItem({
          id,
          productId: `${id}-${typeOfPack}`,
          selectedStock: quantity,
          selectedPackage: typeOfPack,
          stock,
        }),
      );

      if (productInCart && itemsInCart) {
        const total = itemsInCart + quantity;

        setNotification(
          `Added ${quantity} ${typeOfPack} of ${title}. In cart ${total}${typeOfPack}`,
        );
      } else {
        setNotification(`Added ${quantity} ${typeOfPack} of ${title}.`);
      }

      setQuantity(DEFAULT_QNTY);
    }
  };

  const handleAdd = () => {
    clearChecking();

    if (itemsInCart) {
      const total = itemsInCart + quantity;

      if (total > selectedStock) {
        setIsDisabled(true);
        setError(
          `in stock only ${selectedStock}${typeOfPack}, in cart ${itemsInCart}${typeOfPack}(s)`,
        );
      }

      setIsModalActive(true);

      return;
    }

    handeAddingToCart();
  };

  const handleApprove = () => {
    setIsModalActive(false);
    handeAddingToCart();
  };

  const handleDismiss = () => {
    setIsModalActive(false);
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
              className={classNames('display__button')}
              disabled={!quantity}
              onClick={handleAdd}
            >
              <Cross className={classNames('display__svg')} />
              Add to cart
            </button>
            {notification && (
              <p className="display__notification">{notification}</p>
            )}
          </div>
        </div>
        <div className="display__wish-box">
          <button className="display__button-wish" type="button">
            <Heart className="display__svg display__svg--heart" />
            Add to my wish list
          </button>
          {isProductInCart && (
            <Link className="display__cart" to={paths.checkout}>
              The product has been added to the cart.
            </Link>
          )}
        </div>
      </div>
      {isModalActive && (
        <Modal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        >
          <ApprovalModal
            handleApprove={handleApprove}
            handleDismiss={handleDismiss}
            message={`You have ${itemsInCart} item(s) in your cart with the selected package already. Do you want to add ${quantity}${typeOfPack} more?`}
            error={error}
            isDisabled={isDisabled}
          />
        </Modal>
      )}
    </>
  );
};
