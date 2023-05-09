import { INFO } from '@constants/info';
import './LinksBlock.scss';

export const LinksBlock = () => {
  return (
    <div className="links-block">
      {INFO.map(el => (
        <ul className="links-block__list">
          <h2 className="links-block__title" key={el.title}>
            {el.title}
          </h2>
          {el.links.map(link => (
            <li key={link} className="links-block__item">
              <a href="/">
                {link}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
