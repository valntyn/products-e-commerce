import {
  GithubLoginButton, GoogleLoginButton,
} from 'react-social-login-buttons';

import { AuthProvider } from '@utils/providers';

import './SingInModal.scss';

type PropTypes = {
  handleSignIn: (provider: AuthProvider) => Promise<void>;
};

export const SingInModal: React.FC<PropTypes> = ({
  handleSignIn,
}) => {
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
