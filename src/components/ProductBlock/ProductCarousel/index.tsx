import { useCallback, useMemo, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';
import {
  CARD_GAP,
  CARD_WIDTH,
} from '@constants/carousel';
import { getWindowWidthRange } from '@helpers/getWindowWidthRange';
import { useAppSelector } from '@hooks/useAppSelector';

import { SingleCard } from './SingleCard';

import './ProductCarousel.scss';

export const ProductCarousel = () => {
  const { products, selectedProduct } = useAppSelector(
    (state) => state.products,
  );

  const { category } = selectedProduct || {};

  const productsForCarousel = useMemo(() => {
    return products.filter(
      (product) => product.category === category
        && product.id !== selectedProduct?.id,
    );
  }, [products, category, selectedProduct]);

  const skipCardRange = getWindowWidthRange();
  const [lastVisibleCard, setLastVisibleCard] = useState(skipCardRange);

  const scroll = -(lastVisibleCard - skipCardRange) * (CARD_WIDTH + CARD_GAP);

  const styles = useMemo(() => ({
    transform: `translateX(${scroll}px)`,
    transition: 'transform 1s',
  }), [scroll]);

  const onNext = useCallback(() => {
    setLastVisibleCard((prev) => {
      const totalCards = productsForCarousel.length;
      let newCard = prev + skipCardRange;

      if (newCard > totalCards) {
        newCard = totalCards;
      }

      return newCard;
    });
  }, [productsForCarousel.length, skipCardRange]);

  const onPrev = useCallback(() => {
    setLastVisibleCard((prev) => {
      let newCard = prev - skipCardRange;

      if (newCard < skipCardRange) {
        newCard = skipCardRange;
      }

      return newCard;
    });
  }, [skipCardRange]);

  const disabledOnPrev = lastVisibleCard === skipCardRange;
  const disabledOnNext = lastVisibleCard === productsForCarousel.length;

  return (
    <div className="product-carousel">
      <div className="product-carousel__box">
        <h2 className="product-carousel__title">You will maybe love</h2>
        <div className="product-carousel__button-box">
          <button
            className="product-carousel__button"
            type="button"
            onClick={onPrev}
            disabled={disabledOnPrev}
          >
            <Arrow
              className="
              product-carousel__svg
              product-carousel__svg--left
            "
            />
          </button>
          <p className="product-carousel__more">More products</p>
          <button
            className="product-carousel__button"
            type="button"
            onClick={onNext}
            disabled={disabledOnNext}
          >
            <Arrow
              className="
              product-carousel__svg
              product-carousel__svg--right
            "
            />
          </button>
        </div>
      </div>
      <div className="product-carousel__wrapper">
        <ul className="product-carousel__cards" style={styles}>
          {productsForCarousel.map((product) => (
            <SingleCard product={product} key={product.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
