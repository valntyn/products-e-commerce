export type IFormValues = {
  name: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string,
  country: string,
  postalCode: string,
  comment: string,
  spam: boolean,
  terms: boolean,
  [key: string]: string | boolean;
};

export enum AutoFillOff {
  COUNTRY = 'country',
  CITY = 'city',
}

export enum ChangeHandler {
  CODE = 'postalCode',
  CITY = 'city',
  PHONE = 'phoneNumber',
}

export enum Exceptions {
  TERMS = 'terms',
  CITY = 'city',
  COUNTRY = 'country',
  SPAM = 'spam',
}

export type Errors<T> = Partial<{ [K in keyof T]: string }>;
export type Touched<T> = Partial<{ [K in keyof T]: boolean }>;
export type SetTouchedFunction = (fieldName: string, touched: boolean) => void;
