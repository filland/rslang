import { ADD_WORDS } from '../../constants';

export default function addWords(knowArray, mistakesArray) {
  return {
    type: ADD_WORDS,
    payload: {
      knowArray,
      mistakesArray,
    },
  };
}
