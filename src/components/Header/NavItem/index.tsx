import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  clearBrands,
  setBrand,
  setCategory,
} from '@store/reducers/filterSlice';

import { Dropdown } from '../Dropdown';

import './NavItem.scss';

type PropTypes = {
  text: string;
  items: string[];
  sort: string;
};

export const NavItem: React.FC<PropTypes> = ({ text, items, sort }) => {
  const [searchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleHover = useCallback(() => {
    setIsHovered(!isHovered);
  }, [isHovered]);

  const category = searchParams.get('category') || '';

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category));
    }
  }, [category, dispatch]);

  const handleClick = useCallback((value: string) => {
    dispatch(clearBrands());
    dispatch(setBrand(value));
    handleHover();
  }, [dispatch, handleHover]);

  const getSearch = (title: string) => {
    return getSearchWith(searchParams, {
      category: title.toLowerCase() || null,
    });
  };

  return (
    <li
      className="nav-item"
    >
      <Link
        className="nav-item__wrapper"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        to={{
          search: getSearch(text),
        }}
      >
        <p className="nav-item__text">{text}</p>
        <div className="nav-item__svg-box">
          <Arrow
            className={classNames('nav-item__svg', {
              'nav-item__svg--active': isHovered,
            })}
          />
        </div>
        {isHovered
        && (
          <Dropdown
            category={text}
            items={items}
            onChoose={handleClick}
            sort={sort}
          />
        )}
      </Link>
    </li>
  );
};
