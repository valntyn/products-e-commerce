import classNames from 'classnames';
import {
  ChangeEvent, useRef, useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down-small.svg';
import { DEFAULT_DELAY, DEFAULT_QNTY } from '@constants/default';
import { capitalize } from '@helpers/capitalize';
import { useAppSelector } from '@hooks/useAppSelector';
import { useClickOutside } from '@hooks/useClickOutside';
import { Count } from '@utils/count';
import { Stock } from '@utils/product/stock';

import './QntyPanel.scss';

type PropTypes = {
  typeOfPack: keyof Stock | null;
  handleSelectTypeOfPackage: (type: keyof Stock) => void;
  setQuantity: (quantity: number) => void;
  error: string;
  setError: (error: string) => void;
};

export const QntyPanel: React.FC<PropTypes> = ({
  typeOfPack,
  handleSelectTypeOfPackage,
  setQuantity,
  error,
  setError,
}) => {
  const { selectedProduct } = useAppSelector((state) => state.products);

  const [expanded, setExpanded] = useState(false);
  const [visibleQnty, setVisibleQnty] = useState(1);

  const menuRef = useRef<HTMLDivElement>(null);

  const { stock } = selectedProduct || {};
  const selectedStock = stock ? stock[typeOfPack as keyof Stock] : 0;

  const stockKeys = stock && Object.keys(stock);

  const debouncedOnChange = useDebouncedCallback((value: number) => {
    if (!error) {
      setQuantity(value);
    }
  }, DEFAULT_DELAY);

  const handleClear = () => {
    setError('');
    setVisibleQnty(DEFAULT_QNTY);
  };

  const handleCount = (
    name: Count,
  ) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setError('');

    let updatedQuantity = visibleQnty;

    switch (name) {
      case Count.UP:
        updatedQuantity += 1;
        break;
      case Count.DOWN:
        updatedQuantity -= 1;
        break;
      default:
        break;
    }

    if (updatedQuantity < DEFAULT_QNTY) {
      updatedQuantity = DEFAULT_QNTY;
    } else if (updatedQuantity > selectedStock) {
      updatedQuantity = selectedStock;
    }

    setVisibleQnty(updatedQuantity);
    setQuantity(updatedQuantity);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;

    if (!Number.isInteger(inputValue)) {
      return;
    }

    if (inputValue > selectedStock) {
      setError(`available stock: ${selectedStock}${typeOfPack}(s)`);
    } else {
      setError('');
      debouncedOnChange(inputValue);
    }

    setVisibleQnty(inputValue);
  };

  const handleChoose = (type: keyof Stock) => () => {
    setQuantity(DEFAULT_QNTY);
    handleSelectTypeOfPackage(type);
    handleClear();
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleOpen = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleClickOutside = () => {
    setExpanded(false);
  };

  useClickOutside(menuRef, handleClickOutside);

  return (
    <div className="qnty-panel" onClick={handleOpen} ref={menuRef}>
      <label className="qnty-panel__label">
        <input
          type="text"
          className="qnty-panel__input"
          placeholder="qnty"
          value={visibleQnty}
          onChange={handleChange}
          onClick={handleInputClick}
        />
        <div className="qnty-panel__count-box">
          <button
            type="button"
            name={Count.UP}
            className="qnty-panel__count-up"
            onClick={handleCount(Count.UP)}
          >
            <Arrow
              className="
              qnty-panel__count-arrow
              qnty-panel__count-arrow--reversed
            "
            />
          </button>
          <button
            type="button"
            name={Count.DOWN}
            className="qnty-panel__count-down"
            onClick={handleCount(Count.DOWN)}
          >
            <Arrow className="qnty-panel__count-arrow" />
          </button>
        </div>
      </label>
      <div className="qnty-panel__line" />
      <div className="qnty-panel__select-box">
        <p className="qnty-panel__type">
          {capitalize(typeOfPack as keyof Stock)}
        </p>
        <Arrow
          className={classNames('qnty-panel__svg', {
            'qnty-panel__svg--active': expanded,
          })}
        />
      </div>
      {expanded && (
        <ul className="qnty-panel__dropdown">
          {stockKeys?.map((item) => (
            <li
              key={item}
              className="qnty-panel__item"
              onClick={handleChoose(item as keyof Stock)}
            >
              {capitalize(item)}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="qnty-panel__error">{error}</p>}
    </div>
  );
};
