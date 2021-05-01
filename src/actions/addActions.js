const pronounciation_url = 'https://api.openrussian.org/read/ru/';

export const addImageAction  = (imageURL) => ({
    type: 'ADD_IMAGE',
    payload: imageURL
});

export const addExampleSentenceAction = (exampleSentence) => ({
    type: 'ADD_EXAMPLE',
    payload: exampleSentence
});

export const addExtraInfoAction = (extraInfo) => ({
    type: 'ADD_EXTRA',
    payload: extraInfo
});

export const addPronounciationAction = (accented) => ({
    type: 'ADD_PRON',
    payload: `${pronounciation_url}${accented}`
});

export const addAccentedAction = (accented) => ({
    type: 'ADD_ACCENTED',
    payload: accented,
});