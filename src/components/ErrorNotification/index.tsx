import { useNavigate } from 'react-router';

import { ReactComponent as ErrorSVG } from '@assets/svg/error.svg';

import './ErrorNotification.scss';

type PropTypes = {
  text: string;
};

export const ErrorNotification: React.FC<PropTypes> = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <div className="error_notify">
      <div className="error_notify__img">
        <ErrorSVG className="error_notify__svg" />
      </div>
      <p className="error_notify__text">
        {`Sorry, the ${text} you are looking for could not be found.`}
      </p>
      <div className="error_notify__box">
        <button
          type="button"
          className="error_notify__button"
          onClick={goBack}
        >
          return back
        </button>
        <button
          type="button"
          className="error_notify__button"
          onClick={goHome}
        >
          return to home
        </button>
      </div>
    </div>
  );
};
