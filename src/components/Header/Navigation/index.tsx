import { CATEGORIES } from '@constants/categories';

import { NavItem } from '../NavItem';

import './Navigation.scss';

export const Navigation = () => {
  return (
    <div className="navigation">
      {CATEGORIES.map(category => (
        <NavItem text={category.text} />
      ))}
    </div>
  );
};
