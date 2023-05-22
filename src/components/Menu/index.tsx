import {
  Dispatch, SetStateAction, useEffect, useRef,
} from 'react';

import { Sidebar } from '@components/ProductsBlock/Sidebar';

import './Menu.scss';

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
        <div onClick={(e) => e.stopPropagation()} className="menu__content">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
