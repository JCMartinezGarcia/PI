export const isNotEmptyArr = (array) => {
    return array.length;
}


export const cleanText = (text) => {
    let stringOne = text.replaceAll('</p>', '');
    let finalString = stringOne.replaceAll('<p>', '');
    return finalString
}