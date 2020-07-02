import { getJwtToken } from '../../common/utils/TokenUtils';
import { getUserId } from '../../common/utils/UserUtils';

async function fetchUpdateWordDeletedUser(wordId, restoreButton) {
  const urlWordUserIds = `https://afternoon-falls-25894.herokuapp.com/users/${getUserId()}/words/${wordId}`;
  let data;
  if (restoreButton === 'delete') {
    data = {
      optional: {
        deleted: false,
      },
    };
  } else if (restoreButton === 'difficult') {
    data = {
      difficulty: 'normal',
    };
  }
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

const fetchWordServiceRestore = (wordId, restoreButton) => {
  try {
    const result = fetchUpdateWordDeletedUser(wordId, restoreButton);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default fetchWordServiceRestore;
