import {searchReducer} from '../../reducers/searchReducer';
import {searchTermAction} from '../../actions/searchActions';

describe('Search reducer', () => {

    const submitObject = {
        id: 100,
        bare: 'собака',
        accented: 'соба\'ка',
        type: 'noun',
        audio: 'https://openrussian.org/audio-shtooka/собака.mp3',
    }

    it('Should return the initial state', () => {
        expect(searchReducer(undefined,{})).toEqual(
            {
            id: null,
            bare: '',
            accented: '',
            audio: '',
            type:'',
            }
        )
    });

    it('Should return an object with the properties of the search term', () => {
        expect(searchReducer(undefined, searchTermAction(submitObject)
        )).toEqual(submitObject)
    });
    
})