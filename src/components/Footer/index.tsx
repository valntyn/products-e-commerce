import { memo } from 'react';

import { LinksBlock } from './LinksBlock';
import { Tags } from './Tags';

import './Footer.scss';

export const Footer = memo(() => (
  <footer className="footer">
    <div className="footer__block">
      <LinksBlock />
    </div>
    <Tags />
    <p className="footer__copyright">Copyright © 2020 petrbilek.com</p>
  </footer>
));
