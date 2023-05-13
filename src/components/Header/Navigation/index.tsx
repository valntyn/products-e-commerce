import classNames from 'classnames';

import { capitalize } from '@helpers/capitalize';
import { getCategories } from '@helpers/getCategories';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectBrands } from '@store/selectors/selectBrands';

import { NavItem } from '../NavItem';

import './Navigation.scss';

export const Navigation = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);

  const brands = useAppSelector(selectBrands);
  const categories = getCategories(products);

  return (
    <div className="navigation">
      <nav className="navigation__block">
        <ul className={classNames(
          'navigation__list',
          { navigation__loading: isLoading },
        )}
        >
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
