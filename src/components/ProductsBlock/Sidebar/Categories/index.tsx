import { Spinner } from '@components/UI/Spinner';
import './Categories.scss';
import { capitalize } from '@helpers/capitalize';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectCategories } from '@store/selectors/selectCategories';

export const Categories = () => {
  const categories = useAppSelector(selectCategories);

  const { isLoading } = useAppSelector(state => state.products);

  return (
    <div className="categories">
      <h2 className="categories__title">Categories</h2>
      {isLoading && <Spinner />}
      <ul className="categories__list">
        {categories.map((category) => (
          <li className="categories__item" key={category.name}>
            <p className="categories__name">
              {capitalize(category.name)}
            </p>
            <div className="categories__qnty">{category.quantity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
