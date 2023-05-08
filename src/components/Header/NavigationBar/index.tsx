import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';

import './NavigationBar.scss';
import { SearchBar } from '../SearchBar';

export const NavigationBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-bar__dropdown">
        <span className="nav-bar__text">All categories</span>
        <div className="nav-bar__svg-box">
          <Arrow className="nav-bar__svg" />
        </div>
      </div>
      <div className="nav-bar__line" />
      <SearchBar />
    </div>
  );
};
