import React, {useState} from 'react'; 

const Spinner = (props) => {
    
    let loader;
    
    return (
        <svg className={props.loading ? loader = "spinner" : "spinner-hidden"}>
            <circle className="path" cx="200" cy="200" r="100" fill="none" strokeWidth="5"></circle>
        </svg>
    );
}

export default Spinner;