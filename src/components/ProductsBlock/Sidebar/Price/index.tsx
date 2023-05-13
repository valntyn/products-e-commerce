import classNames from 'classnames';
import { useState, useEffect, ChangeEvent } from 'react';
import Slider from 'react-slider';

import './Price.scss';
import { Spinner } from '@components/UI/Spinner';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectPriceRange } from '@store/selectors/selectPrices';

export const Price = () => {
  const { isLoading } = useAppSelector((state) => state.products);
  const { minPrice, maxPrice } = useAppSelector(selectPriceRange);

  const [values, setValues] = useState([0, 100]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (minPrice && maxPrice) {
      setValues([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (error) {
      timeoutId = setTimeout(() => setError(false), 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [error]);

  const handleSliderChange = (newValues: number[]) => {
    if (newValues[1] < values[0]) {
      setValues([newValues[1], newValues[1]]);
    } else {
      setValues(newValues);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;

    if (!Number.isInteger(inputValue)) {
      return;
    }

    switch (e.target.name) {
      case 'min':
        if (inputValue >= maxPrice) {
          setError(true);
        } else if (inputValue > values[1]) {
          const newValues = [values[1], inputValue];

          setValues(newValues.sort((a, b) => a - b));
        } else {
          setValues([inputValue, values[1]]);
        }

        break;

      case 'max':
        if (inputValue <= values[0]) {
          const newValues = [inputValue, values[0]];

          setValues(newValues.sort((a, b) => a - b));
        } else if (inputValue >= maxPrice) {
          setValues([values[0], maxPrice]);
          setError(true);
        } else {
          setValues([values[0], inputValue]);
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
    <div className="price-filter">
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
      <div className="price-filter__input-box">
        <label htmlFor="min" className="price-filter__label">
          Min
          <input
            type="text"
            name="min"
            id="min"
            value={values[0].toFixed()}
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
            value={values[1].toFixed()}
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
