import { Link } from 'react-router-dom';

import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__test">
          <Link to="/">Homepage</Link>
        </li>
        /
        <li>All products</li>
      </ul>
    </nav>
  );
};
