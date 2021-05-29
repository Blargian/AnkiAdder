import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {addImageAction} from '../actions/addActions';
import Spinner from './Spinner';

const ImageGrid = ({word,addImageAction}) => {

    //state for storing the image url and selection state
    const [images, setImages] = useState([{}])
    const [showSpinner,setSpinner] = useState(false);
    const [imagesLoaded, setNumberLoaded] = useState(0);

    //on component mount fetch the images
    useEffect(async ()=>{
        setSpinner(true);
        const results = await axios(
            `https://pixabay.com/api/?key=${process.env.PIXA_API_KEY}&q=${word}&per_page=9`
        );
        const gridImages = [];
        results.data.hits.forEach((image)=>{
            gridImages.push({selected: false, url: image.webformatURL});
        });
        setSpinner(false);
        setImages(gridImages);
        images
    },[])

    //called when an image is clicked
    const selectedImageHandler = (selectedIndex,imageURL) => {
        const updatedImages = [...images];

        //set all but the selected image to false
        updatedImages.forEach((image, index)=>{
            index === selectedIndex ? image.selected = true : image.selected=false;
        });
        setImages(updatedImages);
        addImageAction(imageURL);
    }

    return (
        <div>
            <div className="image-grid">
            <Spinner loading={showSpinner}/>
                {images.map((image,index)=>{
                    return <div 
                        className={`image-grid__image--selected-${image.selected}`} 
                        key={index} 
                        onClick={()=>selectedImageHandler(index,image.url)}
                        style={{
                            content: '',
                            backgroundImage: `url(${image.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '15rem'
                        }} 
                        alt=""/>
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const word = state.search.bare;
    return {word}
}

const mapDispatchToProps = (dispatch) => ({
    addImageAction: (imageURL) => dispatch(addImageAction(imageURL))
})

export default connect(mapStateToProps,mapDispatchToProps)(ImageGrid); 