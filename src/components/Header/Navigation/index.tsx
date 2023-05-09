import { CATEGORIES } from '@constants/categories';

import { NavItem } from '../NavItem';

import './Navigation.scss';

export const Navigation = () => {
  return (
    <div className="navigation">
      <nav className="navigation__block">
        <ul className="navigation__list">
          {CATEGORIES.map((category) => (
            <NavItem text={category.text} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
