import classNames from 'classnames';
import {
  useState, useEffect, ChangeEvent, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slider';
import { useDebouncedCallback } from 'use-debounce';

import './Price.scss';
import { Spinner } from '@components/UI/Spinner';
import {
  DEFAULT_DELAY, DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE,
} from '@constants/default';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setPriceRange } from '@store/reducers/filterSlice';
import { selectPriceRange } from '@store/selectors/selectPrices';
import { Params } from '@utils/params';
import { PriceFilter } from '@utils/priceFilter';

export const Price = () => {
  const { isLoading } = useAppSelector((state) => state.products);
  const { minPrice, maxPrice } = useAppSelector(selectPriceRange);
  const [values, setValues] = useState([0, 0]);
  const [inputValues, setInputValues] = useState([0, 0]);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  const fixedMin = Math.floor(minPrice);
  const fixedMax = Math.ceil(maxPrice);

  useEffect(() => {
    const priceInParams = memoizedSearchParams.get(Params.Price);

    if (priceInParams) {
      const parsedPrice = priceInParams.split(', ').map(Number);

      setValues(parsedPrice);
      setInputValues(parsedPrice);
      dispatch(setPriceRange(parsedPrice));
    } else {
      setValues([fixedMin, fixedMax]);
      setInputValues([fixedMin, fixedMax]);
    }

    setError('');
  }, [dispatch, fixedMin, fixedMax, memoizedSearchParams]);

  const debouncedOnChange = useDebouncedCallback((newValues) => {
    if (!error) {
      dispatch(setPriceRange(newValues));
      setSearchParams(getSearchWith(memoizedSearchParams, {
        price: values.join(', ') || null,
        page: `${DEFAULT_PAGE}`,
        perPage: `${DEFAULT_ITEMS_PER_PAGE}`,
      }));
    }
  }, DEFAULT_DELAY);

  const handleSliderChange = (newValues: number[]) => {
    setValues([newValues[0], newValues[1]]);
    setInputValues(newValues);
    setError('');

    debouncedOnChange(newValues);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;

    if (!Number.isInteger(inputValue)) {
      return;
    }

    setError('');

    switch (e.target.name) {
      case PriceFilter.MIN:
        setInputValues([inputValue, inputValues[1]]);

        if (inputValue > fixedMax) {
          setError(`MAX price is $${fixedMax}`);
        } else if (inputValue > values[1]) {
          setError(`Choose MIN price less than $${values[1]}`);
        } else if (inputValue < fixedMin) {
          setError(`Choose MIN price more than $${fixedMin}`);
        } else {
          handleSliderChange([inputValue, values[1]]);
        }

        break;

      case PriceFilter.MAX:
        setInputValues([inputValues[0], inputValue]);

        if (inputValue > fixedMax) {
          setError(`MAX price is $${fixedMax}`);
        } else if (inputValue < values[0]) {
          setError('MIN can\'t be more than MAX price');
        } else {
          handleSliderChange([values[0], inputValue]);
        }

        break;

      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="price-filter__title">Price</h2>
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="price-filter"
    >
      <h2 className="price-filter__title">Price</h2>
      <Slider
        className="price-filter__slider"
        thumbClassName="price-filter__thumb"
        trackClassName="price-filter__track"
        defaultValue={[fixedMin, fixedMax]}
        minDistance={5}
        value={values}
        min={fixedMin}
        max={fixedMax}
        onChange={handleSliderChange}
        pearling
      />
      <div
        className={classNames(
          'price-filter__input-box',
          { 'price-filter__input-box--error': error },
        )}
      >
        <label
          htmlFor="min"
          data-error={error}
          className={classNames(
            'price-filter__label',
            { 'price-filter__label--error': error },
          )}
        >
          Min
          <input
            type="text"
            name={PriceFilter.MIN}
            id="min"
            value={inputValues[0].toFixed()}
            className={classNames('price-filter__input', {
              'price-filter__input--error': error,
            })}
            onChange={handleInputChange}
          />
        </label>
        <p className="price-filter__space">-</p>
        <label htmlFor="max" className="price-filter__label">
          Max
          <input
            type="text"
            name={PriceFilter.MAX}
            id="max"
            value={inputValues[1].toFixed()}
            className={classNames('price-filter__input', {
              'price-filter__input--error': error,
            })}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </div>
  );
};
