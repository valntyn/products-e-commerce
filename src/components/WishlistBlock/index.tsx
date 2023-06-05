import { useNavigate } from 'react-router';

import { ReactComponent as Wish } from '@assets/svg/favorite.svg';
import { SingleCard } from '@components/SingleCard';
import { Spinner } from '@components/UI/Spinner';
import { useAppSelector } from '@hooks/useAppSelector';

import './WishlistBlock.scss';

export const WishlistBlock = () => {
  const { isLoading, productsInFavorite } = useAppSelector(
    (state) => state.wishlist,
  );

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="wishlist__wrapper">
        <Spinner />
      </div>
    );
  }

  if (!productsInFavorite.length) {
    return (
      <div className="wishlist__wrapper">
        <div className="wishlist__empty">
          <p className="wishlist__notify">
            Your favorite list is empty, come back here when you add some items
          </p>
          <Wish className="wishlist__svg" onClick={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist__wrapper">
      <ul className="wishlist__cards">
        {productsInFavorite.map((product) => (
          <SingleCard product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};
