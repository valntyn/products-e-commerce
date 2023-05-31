import { ReactComponent as Heart } from '@assets/svg/cart-heart.svg';
import { ReactComponent as Cross } from '@assets/svg/cross-cart.svg';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { removeItem, removePrice } from '@store/reducers/cartSlice';
import { ProductForCart } from '@utils/product/productForCart';

import './CartCardManipulation.scss';

type PropTypes = {
  product: ProductForCart;
};

export const CartCardManipulation: React.FC<PropTypes> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { discount, id } = product;

  const hanldeDelete = () => {
    dispatch(removeItem(id));
    dispatch(removePrice({ id }));
  };

  return (
    <div className="manipulation__left-box">
      <div className="manipulation__wrapper-img">
        <img
          src={product.img[0]}
          alt="cart-product"
          className="manipulation__img"
        />
        {!!discount && (
          <p className="manipulation__element">{`- ${discount} %`}</p>
        )}
      </div>
      <div className="manipulation__buttons-box">
        <button type="button" className="manipulation__button">
          <Heart className="manipulation__svg" />
          Wishlist
        </button>
        <button
          type="button"
          className="manipulation__button"
          onClick={hanldeDelete}
        >
          <Cross
            className="manipulation__svg"
          />
          Remove
        </button>
      </div>
    </div>
  );
};
