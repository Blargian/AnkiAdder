import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import {searchTermAction} from '../actions/searchActions';
import axios from 'axios';

const SearchBar = (props) => {

    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults,setSearchResults] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.addSearchTerm(searchTerm);
        setSearchTerm('');
    }

    const onValueChangeHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(async () => {
        if(searchTerm){
            const results = await axios(
                `http://localhost:3000/api/${searchTerm}`
            );
            setSearchResults(results.data);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm])

    return (
        <form className="searchbar">
            <input 
                onChange={onValueChangeHandler}  
                className="searchbar-input" type="text" 
                placeholder="Ваш поиск">
            </input>
            <div className="searchbar__autocomplete">
            {
                searchResults.length>0 && <ul>
                  {
                      searchResults.map((result)=>{
                          return <li key={result.id}>{result.accented}</li>
                      })
                  }
                </ul>
            }
            </div>
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