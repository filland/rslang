import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
    <Button className="btn-word" variant={variant}>
      {wordTranslate}
    </Button>
  );
};

export default Word;
