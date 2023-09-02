export const isNotEmptyArr = (array) => {
    return array.length;
}


export const cleanText = (text) => {
    let stringOne = text.replaceAll('</p>', '');
    let stringTwo = stringOne.replaceAll('<p>', '');
    let finalString = stringTwo.replaceAll('<br />', '');
    return finalString
}