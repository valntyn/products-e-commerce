import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down-sort.svg';
import { ReactComponent as Cross } from '@assets/svg/cross.svg';
import { capitalize } from '@helpers/capitalize';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setIsReversed, setSortFilter } from '@store/reducers/filterSlice';
import { SortFilter } from '@utils/sort';

import './SortLink.scss';

type PropTypes = {
  sort: string;
  title: string;
};

export const SortLink: React.FC<PropTypes> = ({ title, sort }) => {
  const [searchParams] = useSearchParams();
  const isCurrentSort = searchParams.get('sort') === sort;
  const isReversed = searchParams.get('order') === 'desc';

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReversed) {
      dispatch(setIsReversed(true));
    }
  }, [dispatch, isReversed]);

  const getSearchWithSort = (sortBy: SortFilter) => {
    if (sortBy === SortFilter.Reset) {
      return getSearchWith(searchParams, {
        sort: null,
        order: null,
      });
    }

    if (!isCurrentSort) {
      return getSearchWith(searchParams, {
        sort: sortBy,
        order: null,
      });
    }

    if (!isReversed) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return undefined;
  };

  const handleClick = (sortType: SortFilter) => () => {
    dispatch(setSortFilter(sortType));
    dispatch(setIsReversed(false));

    if (isReversed && isCurrentSort) {
      dispatch(setSortFilter(SortFilter.Reset));
    }
  };

  return (
    <Link
      className="sort-link"
      to={{
        search: getSearchWithSort(sort as SortFilter),
      }}
      onClick={handleClick(sort as SortFilter)}
    >
      {capitalize(title)}
      {sort !== SortFilter.Reset && ((isReversed && isCurrentSort) ? (
        <Cross />
      ) : (
        <Arrow className={classNames(
          'sort-link__svg',
          { 'sort-link__svg--reversed': isCurrentSort },
        )}
        />
      ))}
    </Link>
  );
};
