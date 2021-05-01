import {
    addImageAction,
    addExampleSentenceAction, 
    addExtraInfoAction,
    addPronounciationAction,
    addAccentedAction
} from '../../actions/addActions';

test('Should create action for adding an image url to the store', () => {
    const mockURL = 'https://pixabay.com/get/g9f93b282920cb5affb17ffb6ff8b5f90bbc1950f84173aa13729fa0c1c8c0e30496a5a70b88856d868cbd0c70cfb1233_640.jpg'
    const mockAction = {
        type: 'ADD_IMAGE',
        payload: mockURL
    }
    expect(addImageAction(mockURL)).toEqual(mockAction)
});

test('Should create action for adding an example sentence to the store', () => {
    const mockExample = 'Мы вместе до́лжны забо́титься о соба́ке.';
    const mockAction = {
        type: 'ADD_EXAMPLE',
        payload: mockExample
    }
    expect(addExampleSentenceAction(mockExample)).toEqual(mockAction);
});

test('Should create action for adding extra information to the store', () => {
    const mockExtraInfo = 'Gender: female. In English it means dog'
    const mockAction = {
        type: 'ADD_EXTRA',
        payload: mockExtraInfo,
    }

    expect(addExtraInfoAction(mockExtraInfo)).toEqual(mockAction);
}
);

test('Should create action for adding pronounciation',()=>{
    const mockAccented = 'соба́ка';
    const mockAction = {
        type: 'ADD_PRON',
        payload: 'https://api.openrussian.org/read/ru/соба́ка', 
    }

    expect(addPronounciationAction(mockAccented)).toEqual(mockAction);
});

test('Should create action for adding accented word',()=>{
    const mockAccentedWord = 'соба́ка';
    const mockActionAccented = {
        type: 'ADD_ACCENTED',
        payload: mockAccentedWord, 
    }

    expect(addAccentedAction(mockAccentedWord)).toEqual(mockActionAccented);
});