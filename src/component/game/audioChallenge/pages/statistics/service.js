import addWords from './actions';

const dispatchWords = (knowArray, mistakesArray) => async (dispatch) => {
  dispatch(addWords(knowArray, mistakesArray));
};

export default dispatchWords;
