import {searchTermAction} from '../../actions/searchActions';

test('Should create an action to add the search term to the store', () => {

    const submitObject = {
        id: 100,
        bare: 'собака',
        accented: 'соба\'ка',
        type: 'noun',
        audio: 'https://openrussian.org/audio-shtooka/собака.mp3',
    }
    const expectedAction = {
        type: 'ADD_SEARCHTERM',
        payload: {
           ...submitObject
        }
    }

    expect(searchTermAction(submitObject)).toEqual(expectedAction);
})

test('Should set the id equal to null if the search is submitted without selection from suggest',()=>{
    const submitObject = {
        id: null,
        bare: 'собака',
        accented: '',
        type: '',
        audio: '',
    }

    const expectedAction = {
        type: 'ADD_SEARCHTERM',
        payload: {
           ...submitObject,
           id: null
        }
    }

    expect(searchTermAction(submitObject)).toEqual(expectedAction);
})