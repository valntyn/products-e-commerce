import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type PropTypes = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<PropTypes> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'nav-item',
      { 'nav-item--active': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);
