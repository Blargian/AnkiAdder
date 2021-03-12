import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import {searchTermAction} from '../actions/searchActions';

const SearchBar = (props) => {

    const [searchResult, setSearchResult] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.addSearchTerm(searchResult);
        setSearchResult('');
    }

    const onValueChangeHandler = (e) => {
        setSearchResult(e.target.value);
    }

    return (
        <form className="searchbar">
            <input 
                onChange={onValueChangeHandler}  
                className="searchbar-input" type="text" 
                placeholder="Ваш поиск">
            </input>
            <button
                onClick={onSubmitHandler} 
                className="searchbar-button"
            >
                <FontAwesomeIcon className="searchbar-icon" icon={faSearch} />
            </button>
        </form>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addSearchTerm: (search) => dispatch(searchTermAction(search))
})

export default connect(null,mapDispatchToProps)(SearchBar);