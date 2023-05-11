import { capitalize } from '@helpers/capitalize';
import './Dropdown.scss';

type PropTypes = {
  items: string[];
  onChoose: (value: string) => void;
};

export const Dropdown: React.FC<PropTypes> = ({ items, onChoose }) => {
  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        {items.map(item => (
          <li
            key={item}
            className="dropdown__item"
            onClick={() => onChoose(item)}
          >
            {capitalize(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};
