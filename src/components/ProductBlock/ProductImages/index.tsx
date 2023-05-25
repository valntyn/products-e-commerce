import { NO_IMG } from '@constants/card';
import { useAppSelector } from '@hooks/useAppSelector';

import './ProductImages.scss';

export const ProductImages = () => {
  const { selectedProduct } = useAppSelector((state) => state.products);

  const { discount = 0, img = [], freeShipping } = selectedProduct || {};

  return (
    <div className="product-images">
      <div className="product-images__addition-box">
        {!!discount && (
          <p className="product-images__element">{`- ${discount} %`}</p>
        )}
        {freeShipping && (
          <p className="product-images__element">Free shipping</p>
        )}
      </div>
      <div className="product-images__large-box">
        <img
          src={img[0] || NO_IMG}
          alt="main"
          className="product-images__large-img"
        />
      </div>
      <div className="product-images__small-box">
        <img
          src={img[1] || NO_IMG}
          alt="secondary"
          className="product-images__small-img"
        />
        <img
          src={img[2] || NO_IMG}
          alt="secondary"
          className="product-images__small-img"
        />
      </div>
    </div>
  );
};
