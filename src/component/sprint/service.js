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
    const { word } = data[5];
    console.log(data[5].word);
    dispatch(fetchSprintSuccess(word));
  } catch (error) {
    console.log('error');
    dispatch(fetchSprintFail(error));
  }
};

export { fetchSprintService as default };
