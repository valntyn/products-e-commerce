import './Checkbox.scss';

interface PropTypes {
  text?: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
}

export const Checkbox: React.FC<PropTypes> = (props) => {
  const {
    disabled,
    id,
    text,
  } = props;

  return (
    <>
      <input
        type="checkbox"
        disabled={disabled}
        className="checkbox__input"
        id={id}
      />
      <span className="checkbox__checkmark" />
      {text && <p className="checkbox__text">{text}</p>}
    </>
  );
};
