const initialState = {
    searchTerm: ''
}

const searchReducer = (state = initialState,action) => {
    switch(action.type){
        case 'ADD_SEARCHTERM' : {
            return action.payload.searchWord;
        }
        default : {
            return state;
        }
    }
}

export default searchReducer;