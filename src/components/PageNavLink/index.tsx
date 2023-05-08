import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './PageNavLink.scss';

type PropTypes = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<PropTypes> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'nav-link',
      { 'nav-link--active': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);
