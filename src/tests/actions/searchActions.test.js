import {searchTermAction} from '../../actions/searchActions';

test('Should create an action to add the search term to the store', () => {
    const mockSearchTerm = 'собака'; 
    const expectedAction = {
        type: 'ADD_SEARCHTERM',
        payload: {
            searchWord: mockSearchTerm
        }
    }

    expect(searchTermAction(mockSearchTerm)).toEqual(expectedAction);
})