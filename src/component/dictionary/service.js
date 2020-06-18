import {
  fetchWorldSuccess,
  fetchWorldFail,
  fetchWorldRequest,
} from "./actions";
import { getUserIdSelector, getUserTokenSelector } from "./selectors";

export const fetchWorldService = (user) => async (dispatch, getState) => {
  try {
    const state = getState();
    const words = [];
    // const defaultUser = getUserIdSelector(state);
    // const userId = user || defaultUser;
    // const token = getUserTokenSelector();
    const userId = "5eea9233dffad00017faa8e3";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWE5MjMzZGZmYWQwMDAxN2ZhYThlMyIsImlhdCI6MTU5MjQ2MzE2MiwiZXhwIjoxNTkyNDc3NTYyfQ.RSRZm7WKzXffOqXv-lySO5sSBKGvpjgsPCvQQCbsupg";
    dispatch(fetchWorldRequest(userId));

    const urlWorldIds = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
    const responseWorldIds = await fetch(urlWorldIds, {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await responseWorldIds.json();
    const worldIdList = parsedResponse;
    //  worlds - array with worldId and diffictullty
    console.log(worldIdList);

    await Promise.all(worldIdList.map(async (x) => {
      const urlWorld = `https://afternoon-falls-25894.herokuapp.com/words/${x.wordId}`;

      const responseWorld = await fetch(urlWorld);
      const parsedResponseWorld = await responseWorld.json();
      const currentWorld = {
        audio: "files/01_0001.mp3",
        audioExample: "files/01_0001_example.mp3",
        audioMeaning: "files/01_0001_meaning.mp3",
        group: 0,
        id: "5e9f5ee35eb9e72bc21af4a1",
        image: "files/01_0001.jpg",
        page: 0,
        textExample: "The students <b>agree</b> they have too much homework.",
        textExampleTranslate: "Студенты согласны, что у них слишком много домашней работы",
        textMeaning: "To <i>agree</i> is to have the same opinion or belief as another person.",
        textMeaningTranslate: "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
        transcription: "[əgríː]",
        word: "agree",
        wordTranslate: "согласна",
        wordsPerExampleSentence: 8,
      };
      words.push(currentWorld);
    }));

    console.log("returned");
    console.log(words);

    dispatch(fetchWorldSuccess(words));
  } catch (error) {
    dispatch(fetchWorldFail(error));
  }
};
