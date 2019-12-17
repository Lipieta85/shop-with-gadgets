import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import "../../../assets/styles/carousel.scss";

const Carousel = props => {
    let images = [];
    if (typeof props.loadedProductImage != "undefined") {
        images.push({
            original: props.loadedProductImage,
            thumbnail: props.loadedProductImage,
        })
    }
    if (typeof props.loadedProductImage2 != "undefined") {
        images.push({
            original: props.loadedProductImage2,
            thumbnail: props.loadedProductImage2,
        })
    }
    if (typeof props.loadedProductImage3 != "undefined") {
        images.push({
            original: props.loadedProductImage3,
            thumbnail: props.loadedProductImage3,
        })
    }
    console.log(images)
    return (
        <ImageGallery
            items={images}
            showPlayButton={false}
            slideOnThumbnailOver={true}
        />
    );
};

export default Carousel;
