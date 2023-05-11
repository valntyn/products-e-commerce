import { capitalize } from '@helpers/capitalize';
import { getBrands } from '@helpers/getBrands';
import { getCategories } from '@helpers/getCategories';
import { useAppSelector } from '@hooks/useAppSelector';

import { NavItem } from '../NavItem';

import './Navigation.scss';

export const Navigation = () => {
  const { products } = useAppSelector(state => state.products);

  const brands = getBrands(products);
  const categories = getCategories(products);

  return (
    <div className="navigation">
      <nav className="navigation__block">
        <ul className="navigation__list">
          {categories.map((category) => (
            <NavItem
              text={capitalize(category)}
              key={category}
              items={brands}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
