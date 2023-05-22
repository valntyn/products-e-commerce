import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { paths } from '@constants/paths';

import './Homepage.scss';

export const Homepage = () => {
  const location = useLocation();

  return (
    <div className="homepage">
      <h1 className="homepage__welcome">Welcome to our Freshnecom store!</h1>
      <Link
        to={{
          pathname: `${paths.products}`,
          search: location.search,
        }}
        className="homepage__procced"
      >
        Click here to see all Products
      </Link>
    </div>
  );
};
