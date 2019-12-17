import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import "../../../assets/styles/carousel.scss";

const Carousel = props => {
    const images = [
        {
            original: props.loadedProductImage,
            thumbnail: props.loadedProductImage,
        },
        // {
        //     original: props.loadedProductImage,
        //     thumbnail: props.loadedProductImage,
        // },
        // {
        //     original: props.loadedProductImage,
        //     thumbnail: props.loadedProductImage,
        // },
    ];

    return (
        <ImageGallery
            items={images}
            showPlayButton={false}
            slideOnThumbnailOver={true}
        />
    );
};

export default Carousel;
