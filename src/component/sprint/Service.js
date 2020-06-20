import {
  fetchWordRequest,
  fetchWordSuccess,
  fetchWordFail,
} from './actions';

const fetchWordsService = () => async (dispatch) => {
  try {
    dispatch(fetchWordRequest());
    const urlWords = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0';
    const response = await fetch(urlWords);
    const data = await response.json();
    const { word } = data[5];
    console.log(data[5].word);
    dispatch(fetchWordSuccess(word));
  } catch (error) {
    console.log('error');
    dispatch(fetchWordFail(error));
  }
};

export { fetchWordsService as default };
