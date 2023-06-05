import classNames from 'classnames';
import { Field } from 'formik';

import { GITHUB } from '@constants/info';
import { Errors, IFormValues } from '@utils/form';

import './Confirmation.scss';

type PropsTypes = {
  errors: Errors<IFormValues>;
  values: IFormValues;
};

export const Confirmation: React.FC<PropsTypes> = ({ errors, values }) => {
  return (
    <div className="confirm">
      <h1 className="confirm__title">Confirmation</h1>
      <p className="confirm__add-info">
        We are getting to the end. Just few clicks and your order si ready!
      </p>
      <div className="confirm__inputs-block">
        <label
          className={classNames('confirm__label', {
            'confirm__label--active': values.spam,
          })}
          htmlFor="spam"
        >
          <Field
            type="checkbox"
            id="spam"
            name="spam"
            className="confirm__input"
          />
          <span className="confirm__checkmark" />
          <p className="confirm__title-input">
            I agree to receive marketing and newsletter emails. No spam,
            promised!
          </p>
          {errors.spam && <p className="confirm__error">{errors.spam}</p>}
        </label>
        <label
          className={classNames('confirm__label', {
            'confirm__label--active': values.terms,
          })}
          htmlFor="terms"
        >
          <Field
            type="checkbox"
            id="terms"
            name="terms"
            className="confirm__input"
          />
          <span className="confirm__checkmark" />
          <p className="confirm__title-input">
            I agree with our
            {' '}
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="confirm__link"
            >
              terms and conditions
            </a>
            {' '}
            and
            {' '}
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="confirm__link"
            >
              privacy policy
            </a>
            .
            <span className="confirm__star">*</span>
          </p>
          {errors.terms && <p className="confirm__error">{errors.terms}</p>}
        </label>
      </div>
    </div>
  );
};
