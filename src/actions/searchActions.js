
export const searchTermAction  = ({id=null,bare,accented,type,audio}) => ({
    type: 'ADD_SEARCHTERM',
    payload: {
        id, 
        bare,
        accented,
        type,
        audio
    }
});