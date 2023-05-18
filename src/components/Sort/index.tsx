import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down-small.svg';
import { ReactComponent as ArrowSort } from '@assets/svg/arrow-down-sort.svg';
import { capitalize } from '@helpers/capitalize';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setIsReversed, setSortFilter } from '@store/reducers/filterSlice';
import { SortFilter } from '@utils/sort';

import { SortLink } from './SortLink';

import './Sort.scss';

export const Sort = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const menuRef = useRef<HTMLDivElement>(null);

  const { sort, isReversed } = useAppSelector((state) => state.filter);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        menuRef.current
        && !menuRef.current.contains(event.target as HTMLElement)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const sortInParams = searchParams.get('sort');
    const orderInParams = searchParams.get('order');

    if (sortInParams) {
      dispatch(setSortFilter(sortInParams as SortFilter));
    }

    if (orderInParams) {
      dispatch(setIsReversed(true));
    }
  }, [dispatch, searchParams]);

  const handleOpen = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="sort">
      <div className="sort__container" onClick={handleOpen} ref={menuRef}>
        <p className="sort__text">Sort by</p>
        <div className="sort__line" />
        <div className="sort__box">
          <div className="sort__title-box">
            {sort === SortFilter.Reset ? (
              <p className="sort__title">Select</p>
            ) : (
              <>
                <p className="sort__title">{capitalize(sort)}</p>
                <ArrowSort
                  className={classNames('sort__order', {
                    'sort__order--active': sort,
                    'sort__order--reversed': isReversed,
                  })}
                />
              </>
            )}
          </div>
          <Arrow
            className={classNames('sort__svg', {
              'sort__svg--active': expanded,
            })}
          />
        </div>
      </div>
      {expanded && (
        <ul className="sort__dropdown">
          {Object.values(SortFilter).map((filter) => (
            <li className="sort__item">
              <SortLink
                key={filter}
                sort={filter}
                title={filter}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
