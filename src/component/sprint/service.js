import {
  fetchSprintRequest,
  fetchSprintSuccess,
  fetchSprintFail,
} from './actions';

import { level } from './sprint';

const indexes = [];
let page = 0;

const fetchSprintService = () => async (dispatch) => {
  try {
    dispatch(fetchSprintRequest());
    const urlWords = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
    const response = await fetch(urlWords);
    const data = await response.json();
    const randomIndex = Math.round(Math.random() * data.length);
    indexes.push(randomIndex);
    if (indexes.length === 20) {
      indexes.length = 0;
      page += 1;
      if (page === 29) {
        page = 0;
      }
    }
    let randomIndex2;
    if (indexes.length % 3 === 0) {
      randomIndex2 = randomIndex;
    } else {
      randomIndex2 = Math.round(Math.random() * data.length);
    }
    const { word } = data[randomIndex];
    const { wordTranslate } = data[randomIndex];
    const translation = data[randomIndex2].wordTranslate;
    dispatch(fetchSprintSuccess(word, translation, randomIndex, randomIndex2, wordTranslate));
  } catch (error) {
    dispatch(fetchSprintFail(error));
  }
};

export { fetchSprintService as default };
