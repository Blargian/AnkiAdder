
const initialState = {
    imageURL: '',
    accented: '',
    pronounciationURL: '',
    exampleSentence: '',
};

export const addReducer = (state = initialState,action) => {
    switch(action.type){
        case 'ADD_IMAGE' : {
            return ({
                ...state,
                imageURL: action.payload
            });
        }
        default : {
            return state;
        }
    }
}
