/* eslint-disable indent */
/* eslint-disable max-len */

function diffDate(date1, date2) {
    return Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) / (1000 * 60 * 60 * 24));
}

export function getDiffUpdatedDateToNowDays(word) {
    return word.optional && word.optional.updatedDate ? diffDate(new Date(parseInt(word.optional.updatedDate, 10)), new Date()) : 0;
}

export function getWordTodayCount(wordArray) {
    return wordArray.filter((word) => getDiffUpdatedDateToNowDays(word) === 0).length;
}

export function formatDateInWord(word) {
    const d = word.optional && word.optional.showDate ? new Date(parseInt(word.optional.showDate, 10)) : new Date();
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}
export function nameDifficulty(difficultyString) {
    let dotCount;
    switch (difficultyString) {
        case 'hard':
            dotCount = 3;
            break;
        case 'normal':
            dotCount = 2;
            break;
        case 'easy':
            dotCount = 1;
            break;
        default:
            dotCount = 0;
    }
    return dotCount;
}

export function getVolume(volume) {
    console.log(volume);

    if (volume) {
        const result = (volume / 20).toFixed(2);
        return result;
    }
    return 1;
}
