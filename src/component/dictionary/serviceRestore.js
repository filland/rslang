import { getJwtToken } from '../../common/utils/TokenUtils';
import { getUserId } from '../../common/utils/UserUtils';

async function fetchUpdateWordDeletedUser(wordId) {
  const urlWordUserIds = `https://afternoon-falls-25894.herokuapp.com/users/${getUserId()}/words/${wordId}`;
  const data = {
    optional: {
      deleted: 'false',
    },
  };
  const responseWordUserIds = await fetch(urlWordUserIds, {
    method: 'PUT',
    withCredentials: true,
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const result = await responseWordUserIds.json();
  return result;
}

const fetchWordServiceRestore = (wordId) => {
  try {
    const result = fetchUpdateWordDeletedUser(wordId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default fetchWordServiceRestore;
