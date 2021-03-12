import {searchReducer} from '../../reducers/searchReducer';

describe('Search reducer', () => {
    it('Should return the initial state', () => {
        expect(searchReducer(undefined,{})).toEqual(
            {searchTerm: ''}
        )
    });

    it('Should return the search term', () => {
        expect(searchReducer(undefined, {
            type: 'ADD_SEARCHTERM',
            payload: {
                searchWord: 'поиск'
            }
        }
        )).toEqual({
            searchTerm: 'поиск'
        }
        )
    })
})