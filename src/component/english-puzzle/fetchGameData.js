export const getListOfWords = async (page, group) => {
  try {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${
      page - 1
    }&group=${group - 1}`;
    const response = await fetch(url);
    const request = await response.json();
    return request;
  } catch (e) {
    return console.log(e);
  }
};

export const getArrOfRandomWords = (numOfString, arrOfData) => {
  const arrStr = arrOfData[numOfString].textExample.replace(/<[^>]*>/g, "").split(" ");
  for (let i = arrStr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrStr[j];
    arrStr[j] = arrStr[i];
    arrStr[i] = temp;
  }
  return arrStr;
};
