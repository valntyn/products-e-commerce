import classNames from 'classnames';
import React, { ChangeEvent, FocusEvent } from 'react';

import './InputField.scss';
import { AutoFillOff } from '@utils/form';

type PropTypes = {
  error: string | undefined;
  values: string | number;
  handleChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void | ((value: string) => void);
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
  const isCountry = name === AutoFillOff.COUNTRY;
  const isCity = name === AutoFillOff.CITY;
  const autoCompleteValue = isCountry || isCity ? 'do-not-autofill' : 'on';

  return (
    <label className="form-input">
      <p className="form-input__title">
        {title}
        <span className="form-input__require">*</span>
      </p>
      <input
        className={classNames('form-input__input', {
          'form-input__input--disabled': disabled,
        })}
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoCompleteValue}
      />
      {error && touched && <p className="form-input__error">{error}</p>}
    </label>
  );
};
