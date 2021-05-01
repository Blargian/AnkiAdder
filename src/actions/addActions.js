
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