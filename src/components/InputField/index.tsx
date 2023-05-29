import classNames from 'classnames';
import React, { ChangeEvent, FocusEvent } from 'react';

import './InputField.scss';

type PropTypes = {
  error: string | undefined;
  values: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement> | string) => void;
  type: string;
  name: string;
  title?: string;
  placeholder?: string;
  touched?: boolean;
  handleBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const InputField: React.FC<PropTypes> = ({
  error,
  touched,
  values,
  handleChange,
  type,
  placeholder,
  name,
  title,
  handleBlur,
  disabled,
}) => {
  return (
    <label className="form-input">
      <p className="form-input__title">{title}</p>
      <input
        className={classNames(
          'form-input__input',
          { 'form-input__input--disabled': disabled },
        )}
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && touched && <p className="form-input__error">{error}</p>}
    </label>
  );
};
