import { City, ICountry, ICity } from 'country-state-city';
import {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down-small.svg';
import { ReactComponent as Cross } from '@assets/svg/cross.svg';
import { InputField } from '@components/InputField';
import { numbersRegExp } from '@constants/validationSchema';
import {
  filterItems,
  findCountryCode,
} from '@helpers/filterCountriesCities';
import { formattedPhoneNumber } from '@helpers/formatPhoneNumber';
import { useAuth } from '@hooks/useAuth';
import { useClickOutside } from '@hooks/useClickOutside';
import { useCountryData } from '@hooks/useCountryData';
import {
  ChangeHandler, Errors, IFormValues, Touched,
} from '@utils/form';

import './BillingInfo.scss';

type PropsTypes = {
  values: IFormValues;
  errors: Errors<IFormValues>;
  touched: Touched<IFormValues>;
  handleChange: (e: ChangeEvent<HTMLInputElement> | string) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
};

export const BillingInfo: React.FC<PropsTypes> = ({
  handleChange,
  touched,
  errors,
  values,
  handleBlur,
  setFieldValue,
}) => {
  const [countiresExpanded, setCountriesExpanded] = useState(false);
  const [cityExpanded, setCitiesExpanded] = useState(false);
  const [cityDisabled, setCityDisabled] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    localStorage.getItem('selectedCountryCode') || '',
  );
  const {
    email, displayName, altEmail, isAuth,
  } = useAuth();

  const userName = displayName?.split(' ');

  const receivedEmail = email || altEmail;

  useEffect(() => {
    if (!values.email && receivedEmail) {
      setFieldValue('email', receivedEmail);
    }

    if (!values.name && userName?.length) {
      setFieldValue('name', userName[0]);
    }

    if (!values.lastName && userName?.length) {
      setFieldValue('lastName', userName[1]);
    }
  }, [isAuth]);

  const countriesRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('selectedCountryCode', selectedCountryCode);
    setCityDisabled(!values.country || !selectedCountryCode);
  }, [values.country, selectedCountryCode]);

  const countryData = useCountryData();

  const cities = useMemo(() => {
    return selectedCountryCode
      ? City.getCitiesOfCountry(selectedCountryCode)
      : [];
  }, [selectedCountryCode]);

  const filteredCountries = useMemo(
    () => filterItems(countryData, values.country, (country) => country.name),
    [countryData, values.country],
  );

  const filteredCities = useMemo(
    () => filterItems(cities || [], values.city, (city) => city.name),
    [cities, values.city],
  );

  const handleChangeCountry = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFieldValue('country', value);
    setFieldValue('city', '');

    const countryCode = findCountryCode(value, countryData);

    if (countryCode) {
      setSelectedCountryCode(countryCode);
    } else {
      setSelectedCountryCode('');
    }

    setCountriesExpanded(true);
  };

  const handleOptionCountry = (country: ICountry) => () => {
    if (country) {
      setFieldValue('country', country.name);
      setSelectedCountryCode(country.isoCode);
      setCountriesExpanded(false);
    }
  };

  const handleOptionCity = (city: ICity) => () => {
    if (city) {
      setFieldValue('city', city.name);
      setCitiesExpanded(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: ChangeHandler,
  ) => {
    const { value } = e.target;
    let formattedValue = value;

    switch (fieldName) {
      case ChangeHandler.PHONE:
        formattedValue = formattedPhoneNumber(value.replace(numbersRegExp, ''));
        break;
      case ChangeHandler.CODE:
        formattedValue = value.replace(numbersRegExp, '');
        break;
      case ChangeHandler.CITY:
        formattedValue = value;
        setCitiesExpanded(true);
        break;

      default:
        break;
    }

    setFieldValue(fieldName, formattedValue);
  };

  const hanldeClear = () => {
    setFieldValue('country', '');
    setFieldValue('city', '');
  };

  const handleOpenCountries = () => {
    setCountriesExpanded((prevExpanded) => !prevExpanded);
  };

  const handleOpenCities = () => {
    setCitiesExpanded((prevExpanded) => !prevExpanded);
  };

  useClickOutside(countriesRef, () => {
    setCountriesExpanded(false);
  });
  useClickOutside(citiesRef, () => {
    setCitiesExpanded(false);
  });

  return (
    <div className="billing-info">
      <h1 className="billing-info__title">Billing info</h1>
      <p className="billing-info__add-info">Please enter your billing info</p>
      <div className="billing-info__inputs-block">
        <InputField
          placeholder="First name"
          error={errors.name}
          touched={touched.name}
          values={values.name}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="text"
          name="name"
          title="First name"
        />
        <InputField
          placeholder="Last name"
          error={errors.lastName}
          touched={touched.lastName}
          values={values.lastName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="text"
          name="lastName"
          title="Last name"
        />
        <InputField
          placeholder="Email address"
          error={errors.email}
          touched={touched.email}
          values={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="email"
          name="email"
          title="Email address"
        />
        <InputField
          placeholder="Phone number"
          error={errors.phoneNumber}
          touched={touched.phoneNumber}
          values={values.phoneNumber}
          handleChange={(e) => handleInputChange(e, ChangeHandler.PHONE)}
          handleBlur={handleBlur}
          type="text"
          name="phoneNumber"
          title="Phone number"
        />
        <div className="billing-info__data">
          <InputField
            placeholder="Choose a state or Country"
            error={errors.country}
            touched={touched.country}
            values={values.country}
            handleBlur={handleBlur}
            handleChange={handleChangeCountry}
            type="text"
            name="country"
            title="State / Country"
          />
          {values.country && (
            <button
              type="button"
              className="billing-info__cross-button"
              onClick={hanldeClear}
            >
              <Cross className="billing-info__cross" />
            </button>
          )}
          {!!filteredCountries.length && (
            <div
              className="billing-info__arrows-box"
              onClick={handleOpenCountries}
              ref={countriesRef}
            >
              <Arrow className="billing-info__svg billing-info__svg--reverse" />
              <Arrow className="billing-info__svg" />
            </div>
          )}
          {countiresExpanded && (
            <ul className="billing-info__dropdown">
              {filteredCountries?.map((item) => (
                <li
                  key={item.isoCode}
                  className="billing-info__item"
                  onClick={handleOptionCountry(item)}
                >
                  {item.name}
                  <span>{item.flag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="billing-info__data" ref={citiesRef}>
          <InputField
            placeholder="Town / City"
            error={errors.city}
            touched={touched.city}
            values={values.city}
            handleChange={(e) => handleInputChange(e, ChangeHandler.CITY)}
            handleBlur={handleBlur}
            disabled={cityDisabled}
            type="text"
            name="city"
            title="Town / City"
          />
          {(!!filteredCities.length && values.country) && (
            <div
              className="billing-info__arrows-box"
              onClick={handleOpenCities}
            >
              <Arrow className="billing-info__svg billing-info__svg--reverse" />
              <Arrow className="billing-info__svg" />
            </div>
          )}
          {cityExpanded && (
            <ul className="billing-info__dropdown">
              {filteredCities?.map((item) => (
                <li
                  key={`${item.latitude}-${item.longitude}`}
                  className="billing-info__item"
                  onClick={handleOptionCity(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <InputField
          placeholder="Address"
          error={errors.address}
          touched={touched.address}
          values={values.address}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="text"
          name="address"
          title="Address"
        />
        <InputField
          placeholder="Postal code or ZIP"
          error={errors.postalCode}
          touched={touched.postalCode}
          values={values.postalCode}
          handleChange={(e) => handleInputChange(e, ChangeHandler.CODE)}
          handleBlur={handleBlur}
          type="text"
          name="postalCode"
          title="ZIP/Postal code"
        />
      </div>
    </div>
  );
};
