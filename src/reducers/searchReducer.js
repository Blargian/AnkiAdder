
const initialState = {
    searchTerm: ''
};

export const searchReducer = (state = initialState,action) => {
    switch(action.type){
        case 'ADD_SEARCHTERM' : {
            return ({
                searchTerm: action.payload.searchWord
            });
        }
        default : {
            return state;
        }
    }
}
