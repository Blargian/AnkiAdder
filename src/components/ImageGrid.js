import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const ImageGrid = ({word}) => {

    const [images, setImages] = useState([])
    //on component mount fetch the images
    useEffect(async ()=>{
        const results = await axios(
            `https://pixabay.com/api/?key=${process.env.PIXA_API_KEY}&q=${word}&per_page=9`
        );
        setImages(results.data.hits)
        console.log(results)
    },[])

    return (
        <div className="image-grid">
            {images.map((image)=>{
                console.log(image.id)
                console.log(image.webformatURL)
                return <div 
                    className="image-grid__image" 
                    key={image.id} 
                    style={{
                        content: '',
                        backgroundImage: `url(${image.webformatURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '15rem'
                    }} 
                    alt=""/>
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    const word = state.search.searchTerm;
    return {word}
}

export default connect(mapStateToProps,null)(ImageGrid); 