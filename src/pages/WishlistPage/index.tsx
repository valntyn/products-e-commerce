import { useEffect } from 'react';

import { WishlistBlock } from '@components/WishlistBlock';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { getProductsByIdsFavorite } from '@store/reducers/wishlistSlice';

import './WishlistPage.scss';

export const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const {
    itemsInFavorite,
  } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getProductsByIdsFavorite(itemsInFavorite));
  }, [dispatch]);

  return (
    <div className="wishlist">
      <WishlistBlock />
    </div>
  );
};
