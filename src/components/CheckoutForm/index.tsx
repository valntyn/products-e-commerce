import {
  Formik, Form, FormikHelpers, FormikProps,
} from 'formik';
import { useState, useRef, useEffect } from 'react';

import orderImg from '@assets/png/order.png';
import { AdditionInfo } from '@components/CheckoutForm/AdditionInfo';
import { BillingInfo } from '@components/CheckoutForm/BillingInfo';
import { Modal } from '@components/Modal';
import { validationSchema } from '@constants/validationSchema';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { resetCart } from '@store/reducers/cartSlice';
import { IFormValues, SetTouchedFunction } from '@utils/form';

import { Confirmation } from './Confirmation';
import { FormValuesStorage } from './FormStorage';

import './CheckoutForm.scss';

export const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [storedFormValues, setStoredFormValues] = useState(
    localStorage.getItem('formValues'),
  );
  const [isModalActive, setIsModalActive] = useState(false);
  const formikRef = useRef<FormikProps<IFormValues>>(null);

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

  const clearFormValues = () => {
    localStorage.removeItem('formValues');
    setStoredFormValues(null);
  };

  const setAllFieldsTouched = (setTouched: SetTouchedFunction) => {
    if (storedFormValues) {
      const parsedFormValues = JSON.parse(storedFormValues);

      Object.keys(parsedFormValues).forEach((fieldName) => {
        if (initialValues[fieldName]) {
          setTouched(fieldName, true);
        }
      });
    }
  };

  useEffect(() => {
    if (formikRef.current && storedFormValues) {
      setAllFieldsTouched(formikRef.current.setFieldTouched);
    }
  }, []);

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

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    clearFormValues();
    formikHelpers.resetForm({ values: initialValues });
    dispatch(resetCart());
    setIsModalActive(true);
  };

  const hanldeCloseModal = () => {
    setIsModalActive(false);
  };

  const isValidStock = items.every((item) => item.selectedStock);

  return (
    <div className="form">
      <Formik
        innerRef={formikRef}
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
          isValid,
          values,
          isSubmitting,
          dirty,
        }) => {
          const hasErrors = !Object.keys(errors).length;
          const isTouched = !Object.keys(touched).length;

          const isFormInvalid
            = !isValid
            || isSubmitting
            || (isTouched && hasErrors)
            || !items.length
            || !isValidStock
            || !dirty;

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
                disabled={isFormInvalid}
              >
                Complete order
              </button>
              <FormValuesStorage />
            </Form>
          );
        }}
      </Formik>
      {isModalActive && (
        <Modal
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        >
          <div className="form__notify-wrapper">
            <img
              src={orderImg}
              alt="success-order"
              className="form__success-img"
            />
            <h3 className="form__succes-title">
              Your order was successfully created
            </h3>
            <button
              type="button"
              className="form__success-button"
              onClick={hanldeCloseModal}
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
