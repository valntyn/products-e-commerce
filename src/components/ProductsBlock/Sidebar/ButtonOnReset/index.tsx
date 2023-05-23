import { useNavigate } from 'react-router';

import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { resetFilter } from '@store/reducers/filterSlice';

import './ButtonOnReset.scss';

export const ButtonOnReset = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(resetFilter());

    navigate(`${paths.products}`, { replace: true });

    const element = document.documentElement || document.body;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="reset">
      <button
        className="reset__button"
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
