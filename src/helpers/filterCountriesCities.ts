import { ICountry } from 'country-state-city';

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

export const filterItems = <T>(
  items: T[], filterValue: string, getValue: (item: T) => string,
): T[] => {
  if (!filterValue) {
    return items;
  }

  const lowercaseFilterValue = filterValue.trim().toLowerCase();

  return items.filter((item) => getValue(item)
    .toLowerCase().includes(lowercaseFilterValue));
};
