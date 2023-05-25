import { useMemo, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/svg/arrow-down.svg';
import { CARD_GAP, CARD_WIDTH } from '@constants/carousel';
import { useAppSelector } from '@hooks/useAppSelector';

import { SingleCard } from './SingleCard';

import './ProductCarousel.scss';

export const ProductCarousel = () => {
  const { products, selectedProduct } = useAppSelector(
    (state) => state.products,
  );

  const CARDS_PER_PAGE = window.innerWidth < 1240 ? 1 : 4;

  const [lastVisibleCard, setLastVisibleCard] = useState(CARDS_PER_PAGE);

  const scroll = -(lastVisibleCard - CARDS_PER_PAGE) * (CARD_WIDTH + CARD_GAP);
  const styles = {
    transform: `translateX(${scroll}px)`,
    transition: 'transform 1s',
  };

  const { category } = selectedProduct || {};

  const productsForCarousel = useMemo(() => {
    return products.filter(
      (product) => product.category === category
      && product.id !== selectedProduct?.id,
    );
  }, [products, category, selectedProduct]);

  const onNext = () => {
    const totalCards = productsForCarousel.length;
    let newCard = lastVisibleCard + CARDS_PER_PAGE;

    if (newCard > totalCards) {
      newCard = productsForCarousel.length;
    }

    setLastVisibleCard(newCard);
  };

  const onPrev = () => {
    let newCard = lastVisibleCard - CARDS_PER_PAGE;

    if (newCard < CARDS_PER_PAGE) {
      newCard = CARDS_PER_PAGE;
    }

    setLastVisibleCard(newCard);
  };

  const disabledOnPrev = lastVisibleCard === CARDS_PER_PAGE;
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
