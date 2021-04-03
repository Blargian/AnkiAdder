import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import ImageGrid from '../components/ImageGrid';

const Selector = ({word}) => {

    {console.log(word)}
    return (
        <div className="selector">
            <div className="selector__title">
                <div>
                    <h1>{word}</h1>
                    <h3>verb, perfective</h3>
                    <h3>ensued</h3> 
                </div>
                <FontAwesomeIcon className="searchbar-icon" icon={faHeadphones} size="2x" />
            </div>
            <ImageGrid/>
        </div>
    )
}

const mapStateToProps = (state) => {
    const word = state.search.searchTerm;
    return {word}
};

export default connect(mapStateToProps, null)(Selector);