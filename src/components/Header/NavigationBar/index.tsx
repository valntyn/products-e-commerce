import classNames from 'classnames';
import { useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';

import { Dropdown } from '../Dropdown';
import { SearchBar } from '../SearchBar';

import './NavigationBar.scss';

export const NavigationBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="nav-bar">
      <div
        className="nav-bar__dropdown"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <span className="nav-bar__text">All categories</span>
        <div className="nav-bar__svg-box">
          <Arrow
            className={classNames('nav-bar__svg', {
              'nav-bar__svg--active': isHovered,
            })}
          />
        </div>
        {isHovered && (
          <Dropdown />
        )}
      </div>
      <div className="nav-bar__line" />
      <SearchBar />
    </div>
  );
};
