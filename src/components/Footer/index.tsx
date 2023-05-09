import './Footer.scss';
import { LinksBlock } from './LinksBlock';
import { Tags } from './Tags';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__block">
        <LinksBlock />
      </div>
      <Tags />
      <p className="footer__copyright">Copyright © 2020 petrbilek.com</p>
    </footer>
  );
};
