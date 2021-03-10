import React, {useState} from 'react';
import SearchBar from './SearchBar';

const HomeScreen = (props) => {

    const onLoad = window.addEventListener('DOMContentLoaded',(e)=>{
        console.log('DOM loaded')
    })

    return (
        <div className="Homescreen">
            <SearchBar/>
        </div>
    );
}

export default HomeScreen;