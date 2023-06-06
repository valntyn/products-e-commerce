import { useNavigate } from 'react-router';
import {
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import { NO_IMG } from '@constants/card';
import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAuth } from '@hooks/useAuth';
import { githubSignIn, googleSignIn, logOut } from '@store/reducers/authSlice';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const {
    isAuth,
    phoneNumber,
    displayName,
    photoURL,
    email,
    providerId,
    altEmail,
  } = useAuth();

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    dispatch(googleSignIn());
  };

  const handleGithhubSignIn = () => {
    dispatch(githubSignIn());
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate(paths.home);
  };

  const hanldeNavigateList = () => {
    navigate(paths.products);
  };

  if (!isAuth) {
    return (
      <div className="profile-page">
        <div className="profile-page__sign-in">
          <h2 className="profile-page__title">
            Please select one of the authentication methods.
          </h2>
          <GoogleLoginButton onClick={handleGoogleSignIn} />
          <GithubLoginButton onClick={handleGithhubSignIn} />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page__img-box">
        <img
          src={photoURL || NO_IMG}
          className="profile-page__img"
          alt="user"
        />
      </div>
      <ul className="profile-page__list">
        <li className="profile-page__item">
          <p className="profile-page__key">Name:</p>
          <p className="profile-page__value">{displayName}</p>
        </li>
        <li className="profile-page__item">
          <p className="profile-page__key">Email:</p>
          <p className="profile-page__value">{email || altEmail || 'none'}</p>
        </li>
        <li className="profile-page__item">
          <p className="profile-page__key">Number:</p>
          <p className="profile-page__value">{phoneNumber || 'none'}</p>
        </li>
        <li className="profile-page__item">
          <p className="profile-page__key">Provider:</p>
          <p className="profile-page__value">{providerId || 'none'}</p>
        </li>
      </ul>
      <div className="profile-page__buttons-box">
        <button
          className="profile-page__button"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          className="profile-page__button"
          type="button"
          onClick={hanldeNavigateList}
        >
          Go shopping
        </button>
      </div>
    </div>
  );
};
