import { useEffect, useRef } from 'react';

import { capitalize } from '@helpers/capitalize';
import './Dropdown.scss';

type PropTypes = {
  items: string[];
  onChoose: (value: string) => void;
};

export const Dropdown: React.FC<PropTypes> = ({ items, onChoose }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropElement = dropRef.current;

    if (dropElement) {
      const timeoutId = setTimeout(() => {
        dropElement.classList.add('dropdown--active');
      }, 10);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, []);

  return (
    <div className="dropdown" ref={dropRef}>
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
