import errorImg from '@assets/png/error.png';

export const ErrorFallback = () => {
  return (
    <div className="error">
      <img alt="error" src={errorImg} className="error__img" />
    </div>
  );
};
