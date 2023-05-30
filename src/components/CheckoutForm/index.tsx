import {
  Formik, Form, FormikHelpers, useFormikContext,
} from 'formik';
import { useEffect } from 'react';

import { AdditionInfo } from '@components/CheckoutForm/AdditionInfo';
import { BillingInfo } from '@components/CheckoutForm/BillingInfo';
import { validationSchema } from '@constants/validationSchema';
import { IFormValues } from '@utils/form';

import { Confirmation } from './Confirmation';

import './CheckoutForm.scss';

export const CheckoutForm = () => {
  const storedFormValues = localStorage.getItem('formValues');
  const initialValues: IFormValues = storedFormValues
    ? JSON.parse(storedFormValues)
    : {
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

    formikHelpers.resetForm();
  };

  const FormValuesStorage = () => {
    const formik = useFormikContext<IFormValues>();

    useEffect(() => {
      localStorage.setItem('formValues', JSON.stringify(formik.values));
    }, [formik.values]);

    return null;
  };

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
          isValid,
          values,
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
              <FormValuesStorage />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
