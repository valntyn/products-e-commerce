import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { WishlistBlock } from '@components/WishlistBlock';
import { paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAuth } from '@hooks/useAuth';
import { getProductsByIdsFavorite } from '@store/reducers/wishlistSlice';

import './WishlistPage.scss';

export const WishlistPage = () => {
  const dispatch = useAppDispatch();

  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const {
    itemsInFavorite,
  } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    if (!isAuth) {
      navigate(paths.profile);

      return;
    }

    dispatch(getProductsByIdsFavorite(itemsInFavorite));
  }, [dispatch]);

  return (
    <div className="wishlist">
      <WishlistBlock />
    </div>
  );
};
