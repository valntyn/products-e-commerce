import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Heart } from '@assets/svg/cart-heart.svg';
import { ReactComponent as Cross } from '@assets/svg/cross-cart.svg';
import { Modal } from '@components/Modal';
import { SingInModal } from '@components/SignInModal';
import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAuth } from '@hooks/useAuth';
import { githubSignIn, googleSignIn } from '@store/reducers/authSlice';
import { removeItem } from '@store/reducers/cartSlice';
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from '@store/reducers/wishlistSlice';
import { ProductForCart } from '@utils/product/productForCart';

import './CartCardManipulation.scss';

type PropTypes = {
  product: ProductForCart;
};

export const CartCardManipulation: React.FC<PropTypes> = ({
  product: {
    discount, productId, img, id,
  },
}) => {
  const dispatch = useAppDispatch();
  const { itemsInFavorite } = useAppSelector((state) => state.wishlist);
  const isProductInFavorite = itemsInFavorite.some((el) => el === id);

  const [isModalActive, setIsModalActive] = useState(false);
  const { isAuth } = useAuth();

  const hanldeDelete = () => {
    dispatch(removeItem(productId));
  };

  const handleWishList = () => {
    if (!isAuth) {
      setIsModalActive(true);

      return;
    }

    if (isProductInFavorite) {
      dispatch(removeItemFromFavorite(id));
    } else {
      dispatch(addItemToFavorite(id));
    }
  };

  const handleGoogleSignIn = async () => {
    await dispatch(googleSignIn());
    dispatch(addItemToFavorite(id));
    setIsModalActive(false);
  };

  const handleGithhubSignIn = async () => {
    await dispatch(githubSignIn());
    dispatch(addItemToFavorite(id));
    setIsModalActive(false);
  };

  return (
    <div className="manipulation__left-box">
      <div className="manipulation__wrapper-img">
        <Link
          to={{
            pathname: `${paths.products}/${id}`,
          }}
        >
          <img src={img[0]} alt="cart-product" className="manipulation__img" />
        </Link>
        {!!discount && (
          <p className="manipulation__element">{`- ${discount} %`}</p>
        )}
      </div>
      <div className="manipulation__buttons-box">
        <button
          type="button"
          className={classNames(
            'manipulation__button',
            {
              'manipulation__button--active': isProductInFavorite,
              'manipulation__button--inactive': !isProductInFavorite,
            },
          )}
          onClick={handleWishList}
        >
          <Heart
            className="manipulation__svg"
          />
          {isProductInFavorite ? 'In wishlist' : 'Wishlist'}
        </button>
        <button
          type="button"
          className="manipulation__button"
          onClick={hanldeDelete}
        >
          <Cross className="manipulation__svg" />
          Remove
        </button>
      </div>
      {isModalActive && (
        <Modal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        >
          <SingInModal
            handleGithhubSignIn={handleGithhubSignIn}
            handleGoogleSignIn={handleGoogleSignIn}
          />
        </Modal>
      )}
    </div>
  );
};
