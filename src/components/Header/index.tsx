import { Contacts } from './Contacts';
import { MainBlock } from './MainBlock';
import { Navigation } from './Navigation';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Contacts />
      <MainBlock />
      <Navigation />
    </header>
  );
};
