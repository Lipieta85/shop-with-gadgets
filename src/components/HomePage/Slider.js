import React from "react";
import Slider from "react-slick";

import "../../assets/styles/slider.scss";

import image1 from "../../assets/images/iphone.jpg";
import image2 from "../../assets/images/bike.jpg";
import image3 from "../../assets/images/tablet.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MultipleItems = () => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container">
            <h1 className="slider-header">
                DOŁĄCZ DO PROGRAMU, W KTÓRYM MASZ GWARANCJĘ ODBIORU NAGRODY!
            </h1>
            <Slider className="slider border border-dark" {...settings}>
                <div>
                    <a href="/">
                        <img
                            className="slider-image mx-auto"
                            src={image1}
                            alt="slide-img"
                        />
                    </a>
                </div>
                <div>
                    <img
                        className="slider-image mx-auto"
                        src={image2}
                        alt="slide-img"
                    />
                </div>
                <div>
                    <img
                        className="slider-image mx-auto"
                        src={image3}
                        alt="slide-img"
                    />
                </div>
                <div>
                    <img
                        className="slider-image mx-auto"
                        src={image1}
                        alt="slide-img"
                    />
                </div>
                <div>
                    <img
                        className="slider-image mx-auto"
                        src={image2}
                        alt="slide-img"
                    />
                </div>
                <div>
                    <img
                        className="slider-image mx-auto"
                        src={image3}
                        alt="slide-img"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default MultipleItems;
