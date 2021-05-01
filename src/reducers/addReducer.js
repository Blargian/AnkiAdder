
const initialState = {
    imageURL: '',
    accented: '',
    pronounciationURL: '',
    exampleSentence: '',
    extraInfo: '',
};

export const addReducer = (state = initialState,action) => {
    switch(action.type){
        case 'ADD_IMAGE' : {
            return ({
                ...state,
                imageURL: action.payload
            });
        }
        case 'ADD_EXAMPLE' : {
            return({
                ...state,
                exampleSentence: action.payload
            });
        } 
        case 'ADD_EXTRA' : {
            return({
                ...state,
                extraInfo: action.payload
            });
        }
        case 'ADD_PRON' : {
            return({
                ...state,
                pronounciationURL: action.payload
            });
        }
        case 'ADD_ACCENTED' : {
            return({
                ...state,
                accented: action.payload
            });
        }
        default : {
            return state;
        }
    }
}
