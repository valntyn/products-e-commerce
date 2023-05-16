import classNames from 'classnames';
import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slider';
import { useDebouncedCallback } from 'use-debounce';

import './Price.scss';
import { Spinner } from '@components/UI/Spinner';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setPriceRange } from '@store/reducers/filterSlice';
import { selectPriceRange } from '@store/selectors/selectPrices';

export const Price = () => {
  const { isLoading } = useAppSelector((state) => state.products);
  const { minPrice, maxPrice } = useAppSelector(selectPriceRange);
  const [values, setValues] = useState([0, 0]);
  const [inputValues, setInputValues] = useState([0, 0]);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const priceInParams = searchParams.get('price') || null;

    if (priceInParams) {
      const parsedPrice = priceInParams.split(', ').map(Number);

      setValues(parsedPrice);
      setInputValues(parsedPrice);
      dispatch(setPriceRange(parsedPrice));
    } else {
      setValues([minPrice, maxPrice]);
      setInputValues([minPrice, maxPrice]);
    }

    setError('');
  }, [dispatch, minPrice, maxPrice]);

  const debouncedOnChange = useDebouncedCallback((newValues) => {
    dispatch(setPriceRange(newValues));
    setSearchParams(getSearchWith(searchParams, {
      price: values.join(', ') || null,
    }));
  }, 500);

  const handleSliderChange = (newValues: number[]) => {
    setValues([newValues[0], newValues[1]]);
    setInputValues(newValues);

    debouncedOnChange(newValues);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;

    if (!Number.isInteger(inputValue)) {
      return;
    }

    setError('');

    switch (e.target.name) {
      case 'min':
        setInputValues([inputValue, inputValues[1]]);

        if (inputValue >= maxPrice) {
          setError(`MAX price is $${maxPrice}`);
        } else if (inputValue > values[1]) {
          setError(`Choose price less than $${values[1]}`);
        } else if (inputValue < minPrice) {
          setError(`Choose price more than $${minPrice.toFixed()}`);
        } else {
          handleSliderChange([inputValue, values[1]]);
        }

        break;

      case 'max':
        setInputValues([inputValues[0], inputValue]);

        if (inputValue >= maxPrice) {
          setError(`MAX price is $${maxPrice}$`);
        } else if (inputValue < values[0]) {
          setError(`Choose price more than $${values[0]}`);
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
        defaultValue={[minPrice, maxPrice]}
        minDistance={15}
        value={values}
        min={minPrice}
        max={maxPrice}
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
            name="min"
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
            name="max"
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
