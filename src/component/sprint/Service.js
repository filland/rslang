export const fetchWords = () => async () => {
  const urlWords = "https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0";
  try {
    const response = await fetch(urlWords);
    const data = await response.json();
    console.log(data.word);
  } catch (error) {
    console.log("error");
  }
};
