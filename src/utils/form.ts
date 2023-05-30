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
};

export enum AutoFillOff {
  COUNTRY = 'country',
  CITY = 'city',
}

export type Errors<T> = Partial<{ [K in keyof T]: string }>;
export type Touched<T> = Partial<{ [K in keyof T]: boolean }>;
