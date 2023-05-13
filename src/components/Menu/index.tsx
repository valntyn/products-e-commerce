import {
  Dispatch, SetStateAction, useEffect, useRef,
} from 'react';

import './Menu.scss';
import { Brands } from '@components/ProductsBlock/Sidebar/Brands';
import { Categories } from '@components/ProductsBlock/Sidebar/Categories';
import { Price } from '@components/ProductsBlock/Sidebar/Price';
import { Rating } from '@components/ProductsBlock/Sidebar/Rating';

type PropTypes = {
  menuActive: boolean;
  setMenuActive: Dispatch<SetStateAction<boolean>>;
};

export const Menu: React.FC<PropTypes> = ({ menuActive, setMenuActive }) => {
  const handleCloseMenu = () => {
    setMenuActive(false);
  };

  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openElement = openRef.current;

    if (openElement) {
      const timeoutId = setTimeout(() => {
        openElement.classList.add('menu--active');
      }, 10);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [menuActive]);

  return (
    <div
      ref={openRef}
      className="menu"
      onClick={handleCloseMenu}
    >
      <div className="menu__blur">
        <ul className="menu__list" onClick={(e) => e.stopPropagation()}>
          <li className="menu__item">
            <Categories />
          </li>
          <li className="menu__item">
            <Brands />
          </li>
          <li className="menu__item">
            <Rating />
          </li>
          <li className="menu__item">
            <Price />
          </li>
        </ul>
      </div>
    </div>
  );
};
