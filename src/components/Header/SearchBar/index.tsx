import { ReactComponent as Search } from '@assets/svg/search.svg';

import './SearchBar.scss';

export const SearchBar = () => {
  return (
    <label htmlFor="search" className="search-bar">
      <input
        id="search"
        type="text"
        placeholder="Search Products, categories ..."
        autoComplete="off"
        className="search-bar__input"
      />
      <Search className="search-bar__svg" />
    </label>
  );
};
