/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { useAppSelector } from '@hooks/useAppSelector';
import { ITab } from '@utils/tab';

import { Tabs } from './Tabs';

import './ProductTabs.scss';

export const ProductTabs = () => {
  const { selectedProduct } = useAppSelector((state) => state.products);

  const {
    origin,
    recipe,
    reviews,
    questions,
    answers = [],
  } = selectedProduct || {};

  const reviewsQnty = reviews?.length ?? 0;
  const questionsQnty = questions?.length ?? 0;

  const tabs: ITab[] = [
    { id: '1', label: 'Description' },
    { id: '2', label: 'Reviews', quantity: `${reviewsQnty}` },
    { id: '3', label: 'Questions', quantity: `${questionsQnty}` },
  ];

  const [selectedId, setSelectedId] = useState(tabs[0].id);

  const handleTabClick = (id: string | number) => {
    setSelectedId(id);
  };

  const getAnswerByQuestionId = (questionId: number) => answers
    .find((ans) => ans.questionId === questionId)?.answer || false;

  return (
    <div>
      <Tabs selectedId={selectedId} onClick={handleTabClick} tabs={tabs} />
      <div className="product-tab">
        {selectedId === tabs[0].id && (
          <section className="product-tab__section">
            <h3 className="product-tab__title">Origins</h3>
            <p className="product-tab__desc">{origin}</p>
            <h3 className="product-tab__title">Recipe</h3>
            <p className="product-tab__desc">{recipe}</p>
          </section>
        )}
        {selectedId === tabs[1].id && (
          <section className="product-tab__section">
            <h3 className="product-tab__title">
              {reviewsQnty ? 'Last reviews:' : 'There are not reviews yet'}
            </h3>
            <ul className="product-tab__rewiew-list">
              {reviews?.map((review, i) => (
                <li
                  className="product-tab__rewiew"
                  key={i}
                >
                  {review}
                </li>
              ))}
            </ul>
          </section>
        )}
        {selectedId === tabs[2].id && (
          <section className="product-tab__section">
            <h3 className="product-tab__title">
              {questionsQnty
                ? 'Last questions:'
                : 'There are not questions yet'}
            </h3>
            <ul className="product-tab__questions-list">
              {questions?.map((el) => (
                <li
                  className="product-tab__question-item"
                  key={el.questionId}
                >
                  <p className="product-tab__question">{el.question}</p>
                  <p className="product-tab__answer">
                    {getAnswerByQuestionId(el.questionId)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
