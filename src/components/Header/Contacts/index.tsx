import './Contacts.scss';

export const Contacts = () => {
  return (
    <div className="contacts">
      <ul className="contacts__left">
        <li className="contacts__item">
          <a href="/">Chat with us</a>
        </li>
        <li className="contacts__item contacts__item--inactive">
          <a href="tel:+420336775664">+420 336 775 664</a>
        </li>
        <li className="contacts__item contacts__item--inactive">
          <a href="mailto:info@freshnesecom.com">info@freshnesecom.com</a>
        </li>
      </ul>
      <ul className="contacts__right">
        <li className="contacts__item">
          <a href="/" target="_blank" rel="noreferrer">Blog</a>
        </li>
        <li className="contacts__item">
          <a href="/" target="_blank" rel="noreferrer">About Us</a>
        </li>
        <li className="contacts__item">
          <a href="/" target="_blank" rel="noreferrer">Careers</a>
        </li>
      </ul>
    </div>
  );
};
