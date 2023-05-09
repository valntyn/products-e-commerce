import classNames from 'classnames';
import { useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';

import './NavItem.scss';
import { Dropdown } from '../Dropdown';

type PropTypes = {
  text: string;
};

export const NavItem: React.FC<PropTypes> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <li className="nav-item">
      <div
        className="nav-item__wrapper"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <p className="nav-item__text">{text}</p>
        <div className="nav-item__svg-box">
          <Arrow
            className={classNames('nav-item__svg', {
              'nav-item__svg--active': isHovered,
            })}
          />
        </div>
        {isHovered && <Dropdown />}
      </div>
    </li>
  );
};
