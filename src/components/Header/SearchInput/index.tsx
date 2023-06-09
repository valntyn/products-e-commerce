import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { ReactComponent as Cross } from '@assets/svg/cross.svg';
import { ReactComponent as Search } from '@assets/svg/search.svg';
import { DEFAULT_DELAY, DEFAULT_PAGE } from '@constants/default';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setQuery } from '@store/reducers/filterSlice';
import { Params } from '@utils/params';

import './SearchInput.scss';

export const SearchInput = () => {
  const { appliedQuery } = useAppSelector((state) => state.filter);
  const [visualQuery, setVisualQuery] = useState(appliedQuery);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const query = searchParams.get(Params.Query) || '';

  useEffect(() => {
    dispatch(setQuery(query.trim()));
  }, [dispatch]);

  useEffect(() => {
    setVisualQuery(appliedQuery);

    setSearchParams(getSearchWith(searchParams, {
      page: `${DEFAULT_PAGE}`,
    }));
  }, [appliedQuery]);

  const debouncedOnChange = useDebouncedCallback((e) => {
    dispatch(setQuery(e.target.value.trim()));
  }, DEFAULT_DELAY);

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setVisualQuery(value);
    debouncedOnChange(e);

    if (value !== query) {
      setSearchParams(
        getSearchWith(searchParams, {
          query: value.trim() || null,
        }),
      );
    }
  };

  const handleClear = () => {
    setVisualQuery('');
    dispatch(setQuery(''));
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
      }),
    );
  };

  return (
    <label htmlFor="search" className="search">
      <input
        id="search"
        type="text"
        value={visualQuery || query}
        onChange={handleQuery}
        placeholder="Search Products here ..."
        autoComplete="off"
        className="search__input"
      />
      {query ? (
        <button
          type="button"
          disabled={!visualQuery}
          className="search__button"
          onClick={handleClear}
        >
          <Cross className="search__img" />
        </button>
      ) : (
        <Search className="search__svg" />
      )}
    </label>
  );
};
