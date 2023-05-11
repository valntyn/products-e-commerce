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
  const { products } = useAppSelector((state) => state.products);
  const {
    selectedCategory,
    appliedQuery,
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const categories = getCategories(products);
  const allCategories = ['All products', ...categories];

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleClick = useCallback((value: string) => {
    dispatch(setCategory(value));
    setIsHovered(!isHovered);
  }, [dispatch, isHovered]);

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
        <span className="search-bar__text">
          {fixedCategory}
        </span>
        <div className="search-bar__svg-box">
          <Arrow
            className={classNames('search-bar__svg', {
              'search-bar__svg--active': isHovered,
            })}
          />
        </div>
        {isHovered && <Dropdown items={allCategories} onChoose={handleClick} />}
      </div>
      <div className="search-bar__line" />
      <SearchInput />
    </div>
  );
};
