import {
  GithubLoginButton, GoogleLoginButton,
} from 'react-social-login-buttons';

import './SingInModal.scss';

type PropTypes = {
  handleGithhubSignIn: () => void;
  handleGoogleSignIn: () => void;
};

export const SingInModal: React.FC<PropTypes> = ({
  handleGithhubSignIn,
  handleGoogleSignIn,
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
        <GoogleLoginButton onClick={handleGoogleSignIn} />
        <GithubLoginButton onClick={handleGithhubSignIn} />
      </div>
    </div>
  );
};
