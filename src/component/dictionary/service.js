import {
  fetchWorldSuccess,
  fetchWorldFail,
  fetchWorldRequest,
} from "./actions";

export const fetchWorldService = () => async (dispatch, getState) => {
  try {
    const words = [];
    // const state = getState();
    // const defaultUser = getUserIdSelector(state);
    // const userId = user || defaultUser;
    // const token = getUserTokenSelector();
    const userId = "5eea9233dffad00017faa8e3";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWE5MjMzZGZmYWQwMDAxN2ZhYThlMyIsImlhdCI6MTU5MjYyNjkwOCwiZXhwIjoxNTkyNjQxMzA4fQ.Iw9a2d2wcccInulba7dBBThKITwS-KaTVV2fNUA1Juc";
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
        audio: parsedResponseWorld.audio,
        audioExample: parsedResponseWorld.audioExample,
        audioMeaning: parsedResponseWorld.audioMeaning,
        difficulty: x.difficulty,
        group: parsedResponseWorld.group,
        id: parsedResponseWorld.id,
        idUserWorld: x.Id,
        image: parsedResponseWorld.image,
        page: parsedResponseWorld.page,
        textExample: parsedResponseWorld.textExample,
        textExampleTranslate: parsedResponseWorld.textExampleTranslate,
        textMeaning: parsedResponseWorld.textMeaning,
        textMeaningTranslate: parsedResponseWorld.textMeaningTranslate,
        transcription: parsedResponseWorld.transcription,
        word: parsedResponseWorld.word,
        wordTranslate: parsedResponseWorld.wordTranslate,
        wordsPerExampleSentence: parsedResponseWorld.wordsPerExampleSentence,
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
