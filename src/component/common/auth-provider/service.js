import fetchDictionaryWords from '../word/dictionary-word/service';
import fetchUserWords from '../word/user-word/service';
import { getUserSettings } from '../../settings/service';
import getUserStatistics from '../../long-term-statistics/service';

export const fetchData = () => async (dispatch) => {
  await dispatch(getUserSettings());

  dispatch(fetchDictionaryWords());

  dispatch(fetchUserWords());

  dispatch(getUserStatistics());
};
