import { getListOfWords } from '../../english-puzzle/fetchGameData';

const getDataForNextWord = async (page, group, numOfCurrentWord, arrOfData) => {
  let data;
  let currentLevel;
  let currentPage;
  let numOfWord;

  if (numOfCurrentWord === 0
        || (group === 3 && numOfCurrentWord === 20)
        || (numOfCurrentWord === 20)) {
    let p;
    let l;
    if (numOfCurrentWord === 0) {
      currentLevel = group;
      currentPage = page;
      numOfWord = numOfCurrentWord;
      p = currentPage;
      l = currentLevel;
    } else if (group === 3 && numOfCurrentWord === 20) {
      currentLevel = 1;
      currentPage = page + 1;
      numOfWord = 0;
      p = currentPage;
      l = currentLevel;
    } else if (numOfCurrentWord === 20) {
      currentLevel = group + 1;
      currentPage = page;
      numOfWord = 0;
      p = page;
      l = currentLevel;
    }
    data = await getListOfWords(p, l);
  } else {
    data = arrOfData;
    currentLevel = group;
    currentPage = page;
    numOfWord = numOfCurrentWord;
  }

  const currentWordData = data[numOfWord];
  let arrOfRandomWords;

  if (numOfWord > 16 && numOfWord <= 19) {
    const arr = data.slice(numOfWord);
    const p = data.slice(0, (4 - arr.length));
    arrOfRandomWords = arr.concat(p);
  } else {
    arrOfRandomWords = data.slice(numOfWord, numOfWord + 4);
  }

  for (let i = arrOfRandomWords.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrOfRandomWords[j];
    arrOfRandomWords[j] = arrOfRandomWords[i];
    arrOfRandomWords[i] = temp;
  }

  return {
    data,
    currentLevel,
    currentPage,
    numOfWord,
    currentWordData,
    arrOfRandomWords,
  };
};

export default getDataForNextWord;
