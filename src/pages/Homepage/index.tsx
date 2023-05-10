import { useNavigate } from 'react-router';
import './Homepage.scss';

export const Homepage = () => {
  const navigate = useNavigate();

  const goToProducts = () => navigate('/products');

  return (
    <div className="homepage">
      <h1 className="homepage__welcome">
        Welcome to our Freshnecom store!
      </h1>
      <button
        type="button"
        className="homepage__procced"
        onClick={goToProducts}
      >
        Click here to see all Products
      </button>
    </div>
  );
};
