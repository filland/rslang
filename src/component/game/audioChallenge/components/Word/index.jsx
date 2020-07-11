import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

const Word = ({
  wordTranslate,
  rightWord,
  // answer,
  // select,
}) => {
  const expression = () => {
    //   let res = 'info';
    //   if (answer === true) {
    //     res = (rightWord) ? 'success' : 'light';
    //   } else if (answer === false) {
    //     if (select) {
    //       res = 'danger';
    //     } else {
    //       res = (rightWord) ? 'info' : 'light';
    //     }
    //   }
    //   return res;
  };
  return (
    <Button className="btn-word" variant={expression()}>
      {wordTranslate}
    </Button>
  );
};

export default Word;
