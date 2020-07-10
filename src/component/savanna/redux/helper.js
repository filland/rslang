const getDataForNextWord = async (numOfCurrentWord, words) => {
  const data = words;
  const numOfWord = numOfCurrentWord;
  const currentWordData = data[numOfWord];
  let arrOfRandomWords;

  if (numOfWord > 46 && numOfWord <= 49) {
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
    numOfWord,
    currentWordData,
    arrOfRandomWords,
  };
};

export default getDataForNextWord;
