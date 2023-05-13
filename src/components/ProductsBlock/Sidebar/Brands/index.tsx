/* eslint-disable jsx-a11y/label-has-associated-control */
import { Spinner } from '@components/UI/Spinner';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectBrands } from '@store/selectors/selectBrands';

import { Checkbox } from '../Checkbox';
import './Brands.scss';

export const Brands = () => {
  const brands = useAppSelector(selectBrands);

  const { isLoading } = useAppSelector(state => state.products);

  return (
    <div className="brands">
      <h2 className="brands__title">Brands</h2>
      {isLoading && <Spinner />}
      <ul className="brands__list">
        {brands.map((brand) => (
          <li key={brand} className="brands__item">
            <label className="brands__label">
              <Checkbox text={brand} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
