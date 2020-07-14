import React, { useState, useEffect } from 'react';
import Btn from '../../../../common/Btn';
import './styles.scss';

const Word = ({
  isRightAnswer,
  wordTranslate,
  isSelectWord,
  isSelectAnswer,
}) => {
  const [variant, setVariant] = useState('info');
  useEffect(() => {
    if (isSelectAnswer) {
      if (isSelectWord) {
        if (isRightAnswer) {
          setVariant('success');
        } else {
          setVariant('danger');
        }
      } else if (isRightAnswer) {
        setVariant('info');
      } else {
        setVariant('light');
      }
    } else {
      setVariant('info');
    }
  });

  return (
    <Btn className="btn-word" variant={variant}>
      {wordTranslate}
    </Btn>
  );
};

export default Word;
