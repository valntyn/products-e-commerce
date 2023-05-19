import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@constants/default';
import { paths } from '@constants/paths';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  clearBrands,
  setBrand,
  setCategory,
} from '@store/reducers/filterSlice';
import { Params } from '@utils/params';

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

  const category = searchParams.get(Params.Category) || '';

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
      page: `${DEFAULT_PAGE}`,
      perPage: `${DEFAULT_ITEMS_PER_PAGE}`,
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
          pathname: `${paths.products}`,
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
