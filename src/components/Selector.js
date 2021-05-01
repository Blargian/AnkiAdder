import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import ImageGrid from '../components/ImageGrid';
import ExampleSentence from '../components/ExampleSentence';

const Selector = ({word,accented,type,id}) => {

    const [translation, setTranslation] = useState('');

    useEffect(async () => {
        if(id){
            const results = await axios(
                `http://localhost:3000/api/translate/${id}`
            );
            setTranslation(results.data[0].tl)
        } else {
        }
    }, [])

    const playAudioHandler = () => {
        const audioElement = document.getElementsByClassName("play-audio")[0];
        audioElement.play();
    }

    return (
        <div className="selector">
            <div className="selector__title">
                <div>
                    <h1>{word}</h1>
                    <h3>{type}</h3>
                    <h3>{translation}</h3> 
                </div>
                <div>
                    <audio className="play-audio">
                        <source src={`https://api.openrussian.org/read/ru/${accented}`}></source>
                    </audio>
                    <FontAwesomeIcon
                        className="selector__audioIcon" 
                        icon={faHeadphones} 
                        size="2x"
                        onClick={()=>playAudioHandler()}
                    />
                </div>
            </div>
            <ImageGrid/>
            <ExampleSentence/>
        </div>
    )
}

const mapStateToProps = (state) => {
    const word = state.search.bare;
    const accented = state.search.accented;
    const type = state.search.type;
    const id = state.search.id;
    return {word,accented,type,id}
};

export default connect(mapStateToProps, null)(Selector);