import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Spinner } from '@components/UI/Spinner';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setBrand, setSelectedBrands } from '@store/reducers/filterSlice';
import { selectBrands } from '@store/selectors/selectBrands';

import { Checkbox } from '../Checkbox';

import './Brands.scss';

export const Brands = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(selectBrands);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading } = useAppSelector((state) => state.products);

  const handleBrandChange = useCallback((text: string) => {
    dispatch(setBrand(text));
  }, [dispatch]);

  const { selectedBrands } = useAppSelector((state) => state.filter);

  useEffect(() => {
    const brandsInParams = searchParams.get('brands') || null;

    if (brandsInParams) {
      const parsedBrands = brandsInParams.split(', ');

      dispatch(setSelectedBrands(parsedBrands));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (selectedBrands) {
      setSearchParams(getSearchWith(searchParams, {
        brands: selectedBrands.join(', ') || null,
      }));
    }
  }, [searchParams, selectedBrands, setSearchParams]);

  return (
    <div className="brands">
      <h2 className="brands__title">Brands</h2>
      {isLoading && <Spinner />}
      <ul className="brands__list">
        {brands.map((brand) => (
          <li key={brand} className="brands__item">
            <label className="brands__label">
              <Checkbox
                value={brand}
                text={brand}
                onChange={handleBrandChange}
                checked={selectedBrands.includes(brand)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
