import {
  fetchSprintRequest,
  fetchSprintSuccess,
  fetchSprintFail,
} from './actions';

const fetchSprintService = () => async (dispatch) => {
  try {
    dispatch(fetchSprintRequest());
    const urlWords = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0';
    const response = await fetch(urlWords);
    const data = await response.json();
    const randomIndex = Math.round(Math.random() * data.length);
    const randomIndex2 = Math.round(Math.random() * data.length);
    let equality;
    if (randomIndex === randomIndex2) {
      equality = true;
    } else {
      equality = false;
    }
    const { word } = data[randomIndex];
    const translation = data[randomIndex2].wordTranslate;
    dispatch(fetchSprintSuccess(word, translation, randomIndex, randomIndex2, equality));
  } catch (error) {
    dispatch(fetchSprintFail(error));
  }
};

export { fetchSprintService as default };
