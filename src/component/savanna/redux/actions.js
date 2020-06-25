import { getListOfWords } from '../../english-puzzle/fetchGameData';

export const GET_DATA_WITH_WORDS = 'GET_DATA_WITH_WORDS';

export const getData = (page, group) => async (dispatch) => {
  const data = await getListOfWords(page, group);
  const arrOfCurrentWords = data.slice(0, 4);

  dispatch({
    type: GET_DATA_WITH_WORDS,
    payload: {
      data,
      arrOfCurrentWords,
    },
  });
};
