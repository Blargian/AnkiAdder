import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {

    return (
        <form className="searchbar">
            <input className="searchbar-input"type="text" placeholder="Ваш поиск"></input>
            <button className="searchbar-button"><FontAwesomeIcon className="searchbar-icon" icon={faSearch} /></button>
        </form>
    );
}

export default SearchBar;