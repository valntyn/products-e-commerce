import { useNavigate } from 'react-router';

import { ReactComponent as ErrorSVG } from '@assets/svg/error.svg';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <div className="not-found">
      <div className="not-found__img">
        <ErrorSVG className="not-found__svg" />
      </div>
      <p className="not-found__text">
        Sorry, the page you are looking for could not be found.
      </p>
      <div className="not-found__box">
        <button
          type="button"
          className="not-found__button"
          onClick={goBack}
        >
          return back
        </button>
        <button
          type="button"
          className="not-found__button"
          onClick={goHome}
        >
          return to home
        </button>
      </div>
    </div>
  );
};
