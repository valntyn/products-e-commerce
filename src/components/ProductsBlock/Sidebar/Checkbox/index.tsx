import './Checkbox.scss';

interface PropTypes {
  text?: string;
  disabled?: boolean;
  id?: string;
  onChange: (value: string) => void;
  checked: boolean;
  value: string;
}

export const Checkbox: React.FC<PropTypes> = (props) => {
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
};
