import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';

import './NavItem.scss';

type PropTypes = {
  text: string;
};

export const NavItem: React.FC<PropTypes> = ({ text }) => {
  return (
    <div className="nav-item">
      <div className="nav-item__wrapper">
        <span className="nav-item__text">{text}</span>
        <div className="nav-item__svg-box">
          <Arrow className="nav-item__svg" />
        </div>
      </div>
    </div>
  );
};
