import classNames from 'classnames';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { ReactComponent as ArrowRight } from '@assets/svg/arrow-right.svg';
import { ReactComponent as Heart } from '@assets/svg/heart.svg';
import { Modal } from '@components/Modal';
import { SingInModal } from '@components/SignInModal';
import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAuth } from '@hooks/useAuth';
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from '@store/reducers/wishlistSlice';
import { IProduct } from '@utils/product/product';

import './Buttons.scss';

type PropTypes = {
  product: IProduct;
};

export const Buttons: React.FC<PropTypes> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { itemsInFavorite } = useAppSelector((state) => state.wishlist);

  const [isModalActive, setIsModalActive] = useState(false);
  const { isAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${paths.products}/${product.id}${location.search}`);
  };

  const isProductInFavorite = itemsInFavorite.some((el) => el === product.id);
  const isActiveWishList = isAuth && isProductInFavorite;

  const handleAddInWish = () => {
    if (!isAuth) {
      setIsModalActive(true);

      return;
    }

    if (isProductInFavorite) {
      dispatch(removeItemFromFavorite(product.id));
    } else {
      dispatch(addItemToFavorite(product.id));
    }
  };

  return (
    <div className="product-buttons">
      <button
        type="button"
        className="
          product-buttons__button
          product-buttons__detail
        "
        onClick={handleClick}
      >
        Product Detail
        <ArrowRight className="product-buttons__svg" />
      </button>
      <button
        onClick={handleAddInWish}
        type="button"
        className={classNames(
          'product-buttons__button',
          'product-buttons__wishlist',
          {
            'product-buttons__wishlist--active': isActiveWishList,
          },
        )}
      >
        <Heart className="product-buttons__svg product-buttons__svg--heart" />
        {isActiveWishList ? 'In wishlist' : 'Add to wish list'}
      </button>
      {isModalActive && (
        <Modal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        >
          <SingInModal
            setIsModalActive={setIsModalActive}
            id={product.id}
          />
        </Modal>
      )}
    </div>
  );
};
