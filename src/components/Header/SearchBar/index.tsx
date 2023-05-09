import classNames from 'classnames';
import { useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';

import { Dropdown } from '../Dropdown';
import { SearchInput } from '../SearchInput';

import './SearchBar.scss';

export const SearchBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="search-bar">
      <div
        className="search-bar__dropdown"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <span className="search-bar__text">All categories</span>
        <div className="search-bar__svg-box">
          <Arrow
            className={classNames('search-bar__svg', {
              'search-bar__svg--active': isHovered,
            })}
          />
        </div>
        {isHovered && (
          <Dropdown />
        )}
      </div>
      <div className="search-bar__line" />
      <SearchInput />
    </div>
  );
};
