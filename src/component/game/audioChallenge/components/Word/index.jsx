import React, { useState, useEffect } from 'react';
import './styles.scss';

const Word = ({
  isRightAnswer,
  wordTranslate,
  isSelectWord,
  isSelectAnswer,
  number,
}) => {
  const [variant, setVariant] = useState('');
  useEffect(() => {
    if (isSelectAnswer) {
      if (isSelectWord) {
        if (isRightAnswer) {
          setVariant('success');
        } else {
          setVariant('danger');
        }
      } else if (isRightAnswer) {
        setVariant('answer');
      } else {
        setVariant('hide');
      }
    }
  });

  return (
    <>
      <button
        type="button"
        className={variant && `audioChallenge__btn-${variant}`}
        data-btn-num={number}
        data-btn-success={(variant === 'success') ? 'true' : 'false'}>
        {wordTranslate}
      </button>
    </>
  );
};

export default Word;
