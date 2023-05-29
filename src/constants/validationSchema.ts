import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup
    .string()
    .matches(/^[^!@#$%^*&"]+$/, 'invalid characters')
    .required('is required')
    .min(2, 'at least 2 characters')
    .max(32, 'not more than 32 characters'),
  email: Yup.string()
    .email('invalid email')
    .required('is required'),
  lastName: Yup
    .string()
    .required('is required')
    .matches(/^[^!@#$%^*&"]+$/, 'invalid characters')
    .min(2, 'at least 2 characters')
    .max(32, 'not more than 32 characters'),
  phoneNumber: Yup.string()
    .required('is required')
    .min(10, 'at least 10 digits')
    .max(15, 'not more than 15 digits'),
  address: Yup.string()
    .required('is required')
    .matches(/^[^!@#$%]+$/, 'invalid characters'),
  city: Yup.string()
    .matches(/^[^!@#$%]+$/, 'invalid characters')
    .max(32, 'not more than 32 symbols'),
  postalCode: Yup.string()
    .required('is required')
    .matches(/^\d{5}$/, 'must be a 5-digit number'),
  country: Yup.string()
    .required('is required')
    .matches(/^[^!@#$%]+$/, 'invalid characters')
    .max(32, 'not more than 32 symbols'),
  comment: Yup.string()
    .matches(/^[^!@#$%]+$/, 'invalid characters')
    .max(300, 'not more than 300 symbols'),
  spam: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});
