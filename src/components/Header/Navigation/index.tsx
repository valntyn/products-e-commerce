import { CATEGORIES } from '@constants/categories';

import { NavItem } from '../NavItem';

import './Navigation.scss';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {CATEGORIES.map((category) => (
          <NavItem text={category.text} />
        ))}
      </ul>
    </nav>
  );
};
