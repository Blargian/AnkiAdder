
class Utility {
    
    constructor(){}

    //function that takes an object and outputs a json string
    reduxToJSON = (inputObject) => {
        console.log(JSON.stringify(inputObject));
        return JSON.stringify(inputObject);
    }
}

export default Utility;
