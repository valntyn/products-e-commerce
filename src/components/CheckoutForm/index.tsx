import { Formik, Form, FormikHelpers } from 'formik';

import { AdditionInfo } from '@components/CheckoutForm/AdditionInfo';
import { BillingInfo } from '@components/CheckoutForm/BillingInfo';
import { validationSchema } from '@constants/validationSchema';
import { IFormValues } from '@utils/form';

import './CheckoutForm.scss';
import { Confirmation } from './Confirmation';

export const CheckoutForm = () => {
  const initialValues: IFormValues = {
    name: '',
    email: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    comment: '',
    spam: false,
    terms: false,
  };

  const handleSubmit = (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>,
  ) => {
    console.log(values);

    formikHelpers.resetForm();
  };

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => {
          const hasErrors = Object.keys(errors).length > 0;

          return (
            <Form className="form__form">
              <BillingInfo
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
              <AdditionInfo errors={errors} />
              <Confirmation errors={errors} values={values} />
              <button
                className="form__button"
                type="submit"
                disabled={hasErrors}
              >
                Complete order
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
