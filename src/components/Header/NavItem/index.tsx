import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setBrand } from '@store/reducers/filterSlice';

import { Dropdown } from '../Dropdown';

import './NavItem.scss';

type PropTypes = {
  text: string;
  items: string[];
};

export const NavItem: React.FC<PropTypes> = ({ text, items }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleClick = useCallback((value: string) => {
    dispatch(setBrand(value));
    setIsHovered(!isHovered);
  }, [dispatch, isHovered]);

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
        {isHovered && <Dropdown items={items} onChoose={handleClick} />}
      </div>
    </li>
  );
};
