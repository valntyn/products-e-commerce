import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { Spinner } from '@components/UI/Spinner';
import './Categories.scss';
import { capitalize } from '@helpers/capitalize';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectCategories } from '@store/selectors/selectCategories';

export const Categories = () => {
  const [searchParams] = useSearchParams();
  const categories = useAppSelector(selectCategories);

  const { isLoading } = useAppSelector((state) => state.products);
  const { selectedCategory } = useAppSelector((state) => state.filter);

  const getSearch = (title: string) => {
    return getSearchWith(searchParams, {
      category: title,
    });
  };

  return (
    <div className="categories">
      <h2 className="categories__title">Categories</h2>
      {isLoading && <Spinner />}
      <ul className="categories__list">
        {categories.map((category) => (
          <li
            className={classNames(
              'categories__item',
              {
                'categories__item--selected':
                selectedCategory === category.name,
              },
            )}
            key={category.name}
          >
            <Link
              to={{
                search: getSearch(category.name),
              }}
              className="categories__name"
            >
              {capitalize(category.name)}
            </Link>
            <div className="categories__qnty">{category.quantity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
