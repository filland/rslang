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
          deleted: Object.prototype.hasOwnProperty.call(x, 'optional.deleted') ? x.optional.deleted : false,
          difficulty: x.difficulty,
          group: parsedResponseWord.group,
          id: parsedResponseWord.id,
          idUserWord: x.Id,
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
