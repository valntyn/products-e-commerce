import { ICity, ICountry } from 'country-state-city';

export const findCountryCode = (
  countryName: string,
  countryData: ICountry[],
) => {
  const matchingCountry = countryData.find(
    (country) => country.name
      .toLowerCase().trim() === countryName.trim().toLowerCase(),
  );

  return matchingCountry?.isoCode;
};

export const filterCountries = (
  countries: ICountry[],
  filterValue: string,
): ICountry[] => {
  const lowercaseFilterValue = filterValue.trim().toLowerCase();

  return countries
    .filter((country) => country.name
      .toLowerCase().trim().includes(lowercaseFilterValue));
};

export const filterCities = (cities: ICity[], cityName: string): ICity[] => {
  if (!cityName) {
    return cities;
  }

  const filtered = cities
    .filter((city) => city.name
      .toLowerCase().includes(cityName.trim().toLowerCase()));

  return filtered;
};
