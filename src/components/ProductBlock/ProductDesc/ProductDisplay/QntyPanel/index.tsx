import classNames from 'classnames';
import { ChangeEvent, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down-small.svg';
import { DEFAULT_DELAY, DEFAULT_QNTY } from '@constants/default';
import { useAppSelector } from '@hooks/useAppSelector';
import { useClickOutside } from '@hooks/useClickOutside';
import { Stock } from '@utils/product/stock';

import './QntyPanel.scss';

type PropTypes = {
  typeOfPack: keyof Stock | null;
  handleSelectTypeOfPackage: (type: keyof Stock) => void;
  setQuantity: (quantity: number) => void;
  quantity: number;
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

  const {
    stock,
  } = selectedProduct || {};

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;

    if (Number.isInteger(inputValue)) {
      const selectedStock = stock ? stock[typeOfPack as keyof Stock] : 0;

      if (inputValue > selectedStock) {
        setVisibleQnty(inputValue);
        setError(`available stock: ${selectedStock}${typeOfPack}(s)`);
      } else {
        setError('');
        setVisibleQnty(inputValue);
        debouncedOnChange(inputValue);
      }
    }
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
      <input
        type="text"
        className="qnty-panel__input"
        placeholder="qnty"
        value={visibleQnty}
        onChange={handleChange}
        onClick={handleInputClick}
      />
      <div className="qnty-panel__line" />
      <div className="qnty-panel__select-box">
        <p className="qnty-panel__type">{typeOfPack}</p>
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
              {item}
            </li>
          ))}
        </ul>
      )}
      {error && (<p className="qnty-panel__error">{error}</p>)}
    </div>
  );
};
