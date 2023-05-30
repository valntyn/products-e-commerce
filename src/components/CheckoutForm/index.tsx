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
    const trimmedValues: IFormValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        if (typeof value === 'string') {
          return [key, value.trim()];
        }

        return [key, value];
      }),
    );

    console.log(trimmedValues);

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
          isSubmitting,
          isValid,
        }) => {
          const hasErrors = !Object.keys(errors).length;
          const isTouched = !Object.keys(touched).length;

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
                disabled={!isValid || isSubmitting || (isTouched && hasErrors)}
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
