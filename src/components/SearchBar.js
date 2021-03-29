import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import {searchTermAction} from '../actions/searchActions';
import { motion } from "framer-motion"
import axios from 'axios';
import { useHistory } from "react-router-dom";

const SearchBar = (props) => {

    let history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults,setSearchResults] = useState([]);
    const [visible, setVisibility] = useState('searchbar__autocomplete');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.addSearchTerm(searchTerm);
        setSearchTerm('');
        history.push("/add");
    }

    const onValueChangeHandler = (e) => {
        setVisibility('searchbar__autocomplete');
        setSearchTerm(e.target.value);
    }

    const selectSuggestHandler = (id) => {
        const selected = searchResults.filter((result) => {
            return result.id === id;
        })
        setVisibility('searchbar__autocomplete--hide');
        setSearchTerm(selected[0].bare);
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
                value={searchTerm}
                onChange={onValueChangeHandler}  
                className="searchbar-input" type="text" 
                placeholder="Ваш поиск">
            </input>
            <div 
                className={visible}
            >
            {
                searchResults.length>0 && <ul>
                  {
                      searchResults.map((result)=>{
                          return <motion.li 
                                    onClick={()=>selectSuggestHandler(result.id)} 
                                    key={result.id}
                                    whileHover={{ translateX: 5 }}
                                >
                                    {result.accented}
                                </motion.li>
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