import classNames from 'classnames';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as Basket } from '@assets/svg/basket.svg';
import { ReactComponent as Favorite } from '@assets/svg/heartIcon.svg';
import { ReactComponent as User } from '@assets/svg/user.svg';
import { Modal } from '@components/Modal';
import { SingInModal } from '@components/SignInModal';
import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAuth } from '@hooks/useAuth';
import { githubSignIn, googleSignIn } from '@store/reducers/authSlice';
import { AuthProvider } from '@utils/providers';

import './Icons.scss';

export const Icons = memo(() => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { itemsInFavorite } = useAppSelector((state) => state.wishlist);
  const navigate = useNavigate();

  const [isModalActive, setIsModalActive] = useState(false);
  const { isAuth } = useAuth();

  const handleNavigateCart = () => {
    navigate(paths.checkout);
  };

  const handleNavigateProfile = () => {
    navigate(paths.profile);
  };

  const handleNavigateFavorite = () => {
    if (isAuth) {
      navigate(paths.wishlist);
    } else {
      setIsModalActive(true);
    }
  };

  const handleSignIn = async (provider: AuthProvider) => {
    switch (provider) {
      case AuthProvider.GOOGLE:
        await dispatch(googleSignIn());

        break;
      case AuthProvider.GITHUB:
        await dispatch(githubSignIn());

        break;

      default:
        break;
    }

    navigate(paths.wishlist);
    setIsModalActive(false);
  };

  const quantityCart = items.length;
  const quantityFavorite = itemsInFavorite.length;

  return (
    <div className="icons">
      <button
        type="button"
        className="icons__button"
        onClick={handleNavigateProfile}
      >
        <User className="icons__svg" />
      </button>
      <button
        type="button"
        onClick={handleNavigateFavorite}
        data-count-favorite={quantityFavorite}
        className={classNames('icons__button', {
          'icons__button--favorite': quantityFavorite && isAuth,
        })}
      >
        <Favorite className="icons__svg" />
      </button>
      <button
        onClick={handleNavigateCart}
        type="button"
        className={classNames('icons__button', {
          'icons__button--basket': quantityCart,
        })}
        data-count-cart={quantityCart}
      >
        <Basket className="icons__svg" />
      </button>
      {isModalActive && (
        <Modal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        >
          <SingInModal handleSignIn={handleSignIn} />
        </Modal>
      )}
    </div>
  );
});
