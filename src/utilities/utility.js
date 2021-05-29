
class Utility {
    
    constructor(){}

    //function that takes an object and outputs a json string
    reduxToJSON = (inputObject) => {
        let stringified = JSON.stringify(inputObject);
        return stringified;
    }

    //converts sentences to unicodes 
    //https://stackoverflow.com/questions/31649362/json-stringify-and-unicode-characters
    charsToUnicode = (string) => {
        let unicoded = string.replace(/[\u007F-\uFFFF]/g,(char)=>{
            return "\\u" + ("0000" + char.charCodeAt(0).toString(16)).substr(-4)
        });
        let apostrophe_replaced = unicoded.replace(/[']/g,(apostrophe)=>{
            return "\\u0027";
        })
        console.log(apostrophe_replaced)
        return apostrophe_replaced;
    }
}

export default Utility;
