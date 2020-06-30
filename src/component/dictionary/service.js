/* eslint-disable max-len */
import {
  fetchWordSuccess,
  fetchWordFail,
  fetchWordRequest,
} from './actions';
import { getJwtToken } from '../../common/utils/TokenUtils';
import { getUserId } from '../../common/utils/UserUtils';

async function fetchWordUserIds() {
  const urlWordUserIds = `https://afternoon-falls-25894.herokuapp.com/users/${getUserId()}/words`;
  const responseWordUserIds = await fetch(urlWordUserIds, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const result = await responseWordUserIds.json();
  return result;
}

async function fetchAllWords() {
  const urlWords = 'https://afternoon-falls-25894.herokuapp.com/words';
  const responseWords = await fetch(urlWords);
  const result = await responseWords.json();
  return result;
}
// new dont use
function sameDateCheck(currentDate) {
  return currentDate.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0);
}

function formatDate(d) { return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`; }

function diffUpdatedDateToNowDays(date1, date2) {
  return Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) / (1000 * 60 * 60 * 24));
}
const fetchWordService = () => async (dispatch) => {
  try {
    const words = [];
    dispatch(fetchWordRequest(getUserId()));

    const wordUserIdList = await fetchWordUserIds();
    const allWordList = await fetchAllWords();

    wordUserIdList.forEach((x) => {
      const parsedResponseWord = allWordList.find((word) => word.id === x.wordId);

      if (parsedResponseWord) {
        const currentWord = {
          audio: parsedResponseWord.audio,
          audioExample: parsedResponseWord.audioExample,
          audioMeaning: parsedResponseWord.audioMeaning,
          optionalCounter: Object.prototype.hasOwnProperty.call(x, 'optional') && Object.prototype.hasOwnProperty.call(x.optional, 'counter') ? x.optional.counter : 0,
          optionalDeleted: Object.prototype.hasOwnProperty.call(x, 'optional') && Object.prototype.hasOwnProperty.call(x.optional, 'deleted') ? x.optional.deleted : false,
          optionalShowDate: Object.prototype.hasOwnProperty.call(x, 'optional') && Object.prototype.hasOwnProperty.call(x.optional, 'showDate') ? formatDate(new Date(x.optional.showDate)) : formatDate(new Date()),
          optionalUpdatedDate: Object.prototype.hasOwnProperty.call(x, 'optional') && Object.prototype.hasOwnProperty.call(x.optional, 'updatedDate') ? new Date(x.optional.updatedDate) : new Date(),
          optionalUpdatedDateToNowDays: Object.prototype.hasOwnProperty.call(x, 'optional') && Object.prototype.hasOwnProperty.call(x.optional, 'updatedDate') ? diffUpdatedDateToNowDays(new Date(x.optional.updatedDate), new Date()) : 0,
          difficulty: x.difficulty,
          group: parsedResponseWord.group,
          id: parsedResponseWord.id,
          idUserWord: x.id,
          image: parsedResponseWord.image,
          page: parsedResponseWord.page,
          textExample: parsedResponseWord.textExample,
          textExampleTranslate: parsedResponseWord.textExampleTranslate,
          textMeaning: parsedResponseWord.textMeaning,
          textMeaningTranslate: parsedResponseWord.textMeaningTranslate,
          transcription: parsedResponseWord.transcription,
          word: parsedResponseWord.word,
          wordTranslate: parsedResponseWord.wordTranslate,
          wordsPerExampleSentence: parsedResponseWord.wordsPerExampleSentence,
        };
        words.push(currentWord);
      }
    });
    dispatch(fetchWordSuccess(words));
  } catch (error) {
    dispatch(fetchWordFail(error));
  }
};

export default fetchWordService;
