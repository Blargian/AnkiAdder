import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import {searchTermAction} from '../actions/searchActions';
import {addPronounciationAction, addAccentedAction} from '../actions/addActions';
import { motion } from "framer-motion"
import axios from 'axios';
import { useHistory } from "react-router-dom";

const SearchBar = ({addSearchTerm, addAccented, addPronounciation}) => {

    let history = useHistory();

    const [searchTerm, setSearchTerm] = useState('');
    const [accented, setAccented] = useState('');
    const [type, setType] = useState('');
    const [audio, setAudio] = useState('');
    const [id, setID] = useState(null);

    const [searchResults,setSearchResults] = useState([]);
    const [visible, setVisibility] = useState('searchbar__autocomplete');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const submitObject = {
            id,
            bare: searchTerm,
            accented,
            type,
            audio
        }
        addSearchTerm(submitObject);
        addAccented(accented);
        addPronounciation(accented);
        setSearchTerm('');

        //Could implement the logic on what to do eg) verb vs noun here
        //then make the appropriate pushes
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

        //Set the states
        setSearchTerm(selected[0].bare);
        setAccented(selected[0].accented);
        setType(selected[0].type);
        setAudio(selected[0].audio);
        setID(selected[0].id);
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
    addSearchTerm: (search) => dispatch(searchTermAction(search)),
    addAccented: (word) => dispatch(addAccentedAction(word)),
    addPronounciation: (url) => dispatch(addPronounciationAction(url)),
})

export default connect(null,mapDispatchToProps)(SearchBar);