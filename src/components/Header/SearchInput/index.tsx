import { ReactComponent as Search } from '@assets/svg/search.svg';

import './SearchInput.scss';

export const SearchInput = () => {
  return (
    <label htmlFor="search" className="search">
      <input
        id="search"
        type="text"
        placeholder="Search Products, categories ..."
        autoComplete="off"
        className="search__input"
      />
      <Search className="search__svg" />
    </label>
  );
};
