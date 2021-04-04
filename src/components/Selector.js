import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import ImageGrid from '../components/ImageGrid';
import ExampleSentence from '../components/ExampleSentence';

const Selector = ({word,accented,type}) => {

    return (
        <div className="selector">
            <div className="selector__title">
                <div>
                    <h1>{word}</h1>
                    <h3>{type}</h3>
                    <h3>ensued</h3> 
                </div>
                <FontAwesomeIcon className="searchbar-icon" icon={faHeadphones} size="2x" />
            </div>
            <ImageGrid/>
            <ExampleSentence/>
            <button>Add to Anki</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    const word = state.search.bare;
    const accented = state.search.accented;
    const type = state.search.type;
    return {word,accented,type}
};

export default connect(mapStateToProps, null)(Selector);