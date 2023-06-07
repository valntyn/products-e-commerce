import { useNavigate } from 'react-router';
import {
  GithubLoginButton, GoogleLoginButton,
} from 'react-social-login-buttons';

import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { githubSignIn, googleSignIn } from '@store/reducers/authSlice';
import { addItemToFavorite } from '@store/reducers/wishlistSlice';
import { AuthProvider } from '@utils/providers';

import './SingInModal.scss';

type PropTypes = {
  setIsModalActive: (active: boolean) => void;
  isWishlist?: boolean;
  id?: string;
};

export const SingInModal: React.FC<PropTypes> = ({
  setIsModalActive,
  isWishlist,
  id,
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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

    if (id) {
      dispatch(addItemToFavorite(id));
    }

    if (isWishlist) {
      navigate(paths.wishlist);
    }

    setIsModalActive(false);
  };

  return (
    <div className="sign-in">
      <h2 className="sign-in__title">
        You are not authorized
      </h2>
      <p className="sign-in__notfy">
        Please select one of the authentication methods below.
      </p>
      <div className="sign-in__auth-buttons">
        <GoogleLoginButton onClick={() => handleSignIn(AuthProvider.GOOGLE)} />
        <GithubLoginButton onClick={() => handleSignIn(AuthProvider.GITHUB)} />
      </div>
    </div>
  );
};
