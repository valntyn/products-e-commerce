import { useEffect, useRef } from 'react';
import './Dropdown.scss';
import { Link, useSearchParams } from 'react-router-dom';

import { paths } from '@constants/paths';
import { capitalize } from '@helpers/capitalize';
import { getSearchWith } from '@helpers/searchHelpers';

type PropTypes = {
  items: string[];
  onChoose: (value: string) => void;
  sort: string;
  category?: string;
};

export const Dropdown: React.FC<PropTypes> = ({
  items,
  onChoose,
  sort,
  category,
}) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const dropElement = dropRef.current;

    if (dropElement) {
      const timeoutId = setTimeout(() => {
        dropElement.classList.add('dropdown--active');
      }, 10);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, []);

  const getSearch = (title: string) => {
    switch (sort) {
      case 'brands':
        return getSearchWith(searchParams, {
          brands: title,
          category: category?.toLowerCase() || null,
        });
      case 'categories':
        return getSearchWith(searchParams, {
          category: title.toLowerCase() || 'all products',
        });
      default:
        return searchParams.toString();
    }
  };

  return (
    <div className="dropdown" ref={dropRef}>
      <ul className="dropdown__list">
        {items.map((item) => (
          <li
            key={item}
            className="dropdown__item"
            onClick={() => onChoose(item)}
          >
            <Link
              className="dropdown__link"
              to={{
                pathname: `${paths.products}`,
                search: getSearch(item),
              }}
            >
              {capitalize(item)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
