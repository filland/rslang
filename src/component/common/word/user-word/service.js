import { fetchUserWordsRequest, fetchUserWordsFail, fetchUserWordsSuccess } from './actions';
import authorizedRequest from '../../../../common/utils/ApiUtils';
import { getUserId } from '../../../../common/utils/UserUtils';

const fetchUserWords = async (dispatch) => {
  try {
    dispatch(fetchUserWordsRequest());

    const userId = getUserId();
    const USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
    const userWords = await authorizedRequest(USER_WORDS_URL);

    dispatch(fetchUserWordsSuccess(userWords));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export default fetchUserWords;
