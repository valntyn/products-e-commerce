import { memo } from 'react';
import './Checkbox.scss';

interface PropTypes {
  onChange: (value: string) => void;
  checked: boolean;
  value: string;
  text?: string;
  disabled?: boolean;
  id?: string;
}

export const Checkbox: React.FC<PropTypes> = memo(
  (props) => {
    const {
      disabled,
      id,
      text,
      onChange,
      checked,
      value,
    } = props;

    return (
      <>
        <input
          type="checkbox"
          disabled={disabled}
          className="checkbox__input"
          id={id}
          checked={checked}
          onChange={() => onChange(value)}
        />
        <span className="checkbox__checkmark" />
        {text && <p className="checkbox__text">{text}</p>}
      </>
    );
  },
);
