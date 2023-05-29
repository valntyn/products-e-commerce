import { Field } from 'formik';

import './AdditionInfo.scss';
import { Errors, IFormValues } from '@utils/form';

type PropsTypes = {
  errors: Errors<IFormValues>;
};

export const AdditionInfo: React.FC<PropsTypes> = ({ errors }) => {
  return (
    <div className="addition-info">
      <h1 className="addition-infog-info__title">Additional informations</h1>
      <p className="addition-info__add-info">
        Need something else? We will make it for you!
      </p>
      <div className="addition-info__inputsblock">
        <label htmlFor="comment" className="addition-info__label">
          <p className="addition-info__text">Order notes</p>
          <Field
            className="addition-info__area"
            as="textarea"
            id="comment"
            name="comment"
            placeholder={
              'Need a specific delivery day? Sending a gift? '
              + 'Let’s say ...'
            }
          />
          {errors.comment && (
            <p className="addition-info__error">{errors.comment}</p>
          )}
        </label>
      </div>
    </div>
  );
};
