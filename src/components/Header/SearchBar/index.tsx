import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';
import { capitalize } from '@helpers/capitalize';
import { getCategories } from '@helpers/getCategories';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setCategory } from '@store/reducers/filterSlice';

import { Dropdown } from '../Dropdown';
import { SearchInput } from '../SearchInput';

import './SearchBar.scss';

export const SearchBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { products, isLoading } = useAppSelector((state) => state.products);
  const {
    selectedCategory,
    appliedQuery,
  } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();
  const categories = getCategories(products);
  const allCategories = ['All products', ...categories];

  const handleHover = useCallback(() => {
    setIsHovered(!isHovered);
  }, [isHovered]);

  const handleClick = useCallback((value: string) => {
    dispatch(setCategory(value));
    handleHover();
  }, [dispatch, handleHover]);

  const fixedCategory = capitalize(selectedCategory);

  return (
    <div className={classNames(
      'search-bar',
      { 'search-bar--active': appliedQuery },
    )}
    >
      <div
        className="search-bar__dropdown"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <span className={classNames(
          'search-bar__text',
          { 'search-bar__loading': isLoading },
        )}
        >
          {!isLoading && fixedCategory}
        </span>
        <div className="search-bar__svg-box">
          <Arrow
            className={classNames('search-bar__svg', {
              'search-bar__svg--active': isHovered,
            })}
          />
        </div>
        {isHovered
        && (
          <Dropdown
            items={allCategories}
            onChoose={handleClick}
            sort="categories"
          />
        )}
      </div>
      <div className="search-bar__line" />
      <SearchInput />
    </div>
  );
};
