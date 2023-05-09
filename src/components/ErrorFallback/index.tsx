import errorImg from '@assets/png/error.png';
import './ErrorFallback.scss';

export const ErrorFallback = () => {
  return (
    <div className="error">
      <img alt="error" src={errorImg} className="error__img" />
    </div>
  );
};
