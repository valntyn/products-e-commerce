import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  ReactComponent as StarFilled,
} from '@assets/svg/star-sidebar-filled.svg';
import { ReactComponent as StarEmpty } from '@assets/svg/star-sidebar.svg';
import { Spinner } from '@components/UI/Spinner';
import { Stars } from '@components/UI/Stars';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@constants/default';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setRating, setSelectedRating } from '@store/reducers/filterSlice';
import { Params } from '@utils/params';

import { Checkbox } from '../Checkbox';

import './Rating.scss';

export const Rating = () => {
  const { isLoading } = useAppSelector((state) => state.products);
  const { selectedRating } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const stars = [];

  const handleRatingChange = useCallback(
    (rating: string) => {
      dispatch(setRating(`${rating}`));

      setSearchParams(
        getSearchWith(searchParams, {
          page: `${DEFAULT_PAGE}`,
          perPage: `${DEFAULT_ITEMS_PER_PAGE}`,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    const brandsInParams = searchParams.get(Params.Rating);

    if (brandsInParams) {
      const parsedRating = brandsInParams.split(', ');

      dispatch(setSelectedRating(parsedRating));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (selectedRating) {
      setSearchParams(getSearchWith(searchParams, {
        rating: selectedRating.join(', ') || null,
      }));
    }
  }, [searchParams, selectedRating, setSearchParams]);

  if (isLoading) {
    return (
      <div className="rating">
        <h2 className="rating__title">Price</h2>
        <Spinner />
      </div>
    );
  }

  for (let i = 5; i >= 1; i -= 1) {
    stars.push(
      <li className="rating__item" key={i}>
        <label className="rating__label">
          <Checkbox
            value={`${i}`}
            onChange={handleRatingChange}
            checked={selectedRating.includes(`${i}`)}
          />
          <Stars
            number={i}
            inactiveStarIcon={StarEmpty}
            activeStarIcon={StarFilled}
          />
        </label>
      </li>,
    );
  }

  return (
    <div className="rating">
      <h2 className="rating__title">Rating</h2>
      <ul className="rating__list">{stars}</ul>
    </div>
  );
};
