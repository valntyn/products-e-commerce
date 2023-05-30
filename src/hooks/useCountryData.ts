import { Country, ICountry } from 'country-state-city';
import { useMemo } from 'react';

export const useCountryData = (): ICountry[] => {
  return useMemo(() => {
    return Country.getAllCountries();
  }, []);
};
