import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import { Exceptions, IFormValues } from '@utils/form';

export const FormValuesStorage = () => {
  const formik = useFormikContext<IFormValues>();

  useEffect(() => {
    const filteredValues = Object.fromEntries(
      Object.entries(formik.values).filter(
        ([key]) => key !== Exceptions.COUNTRY
        && key !== Exceptions.CITY && key !== Exceptions.TERMS,
      ),
    );

    localStorage.setItem('formValues', JSON.stringify(filteredValues));
  }, [formik.values]);

  return null;
};
