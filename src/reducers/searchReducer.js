
const initialState = {
    id: null,
    bare: '',
    accented: '',
    audio: '',
    type:'',
};

export const searchReducer = (state = initialState,action) => {
    switch(action.type){
        case 'ADD_SEARCHTERM' : {
            return ({
               ...state,
               id: action.payload.id,
               bare: action.payload.bare,
               accented: action.payload.accented,
               audio: action.payload.audio,
               type: action.payload.type,
            });
        }
        default : {
            return state;
        }
    }
}
