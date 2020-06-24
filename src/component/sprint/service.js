import {
  fetchSprintRequest,
  fetchSprintSuccess,
  fetchSprintFail,
} from './actions';

const fetchSprintService = () => async (dispatch) => {
  try {
    dispatch(fetchSprintRequest());
    const urlWords = `https://afternoon-falls-25894.herokuapp.com/words?page=2&group=2`;
    const response = await fetch(urlWords);
    const data = await response.json();
    const randomIndex = Math.round(Math.random() * data.length);
    const randomIndex2 = Math.round(Math.random() * data.length);
    const { word } = data[randomIndex];
    const { wordTranslate } = data[randomIndex];
    const translation = data[randomIndex2].wordTranslate;
    dispatch(fetchSprintSuccess(word, translation, randomIndex, randomIndex2, wordTranslate));
  } catch (error) {
    dispatch(fetchSprintFail(error));
  }
};

export { fetchSprintService as default };
