import React from "react";
import Slider from "react-slick";

import image1 from "../../assets/images/cards.jpg"
import image2 from "../../assets/images/chart.jpg"
import image3 from "../../assets/images/cup.jpg"
import image4 from "../../assets/images/expedition.jpg"
import image5 from "../../assets/images/premia_20.jpg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

const SingleSlider = () => {

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        focusOnSelect: true,
        pauseOnDotsHover: true,
    };


    return (
        <Slider className="slider" {...settings}>
            <div className="slide-content">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <img className="slider-image w-100" src={image1} alt="slide-img" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                        <div className="slide-text mt-3">
                            <h2 className="text-header">Karty prezentowe</h2>
                            <p className="text-content">Uwolnij swoją kreatywność zakupową</p>
                            <button type="button" className="btn btn-outline-primary btn-sign-up">WIĘCEJ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-content">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <img className="slider-image w-100" src={image1} alt="slide-img" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                        <div className="slide-text mx-auto mt-3">
                            <h2 className="text-header">Pewne nagrody</h2>
                            <p className="text-content">Przekraczasz próg 20% i odbierasz nagrodę</p>
                            <button type="button" className="btn btn-outline-primary btn-sign-up">WIĘCEJ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-content">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <img className="slider-image w-100" src={image3} alt="slide-img" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                        <div className="slide-text mx-auto mt-3">
                            <h2 className="text-header">Karty prezentowe</h2>
                            <p className="text-content">Uwolnij swoją kreatywność zakupową</p>
                            <button type="button" className="btn btn-outline-primary btn-sign-up">WIĘCEJ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-content">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <img className="slider-image w-100" src={image4} alt="slide-img" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                        <div className="slide-text mx-auto mt-3">
                            <h2 className="text-header">Karty prezentowe</h2>
                            <p className="text-content">Uwolnij swoją kreatywność zakupową</p>
                            <button type="button" className="btn btn-outline-primary btn-sign-up">WIĘCEJ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-content">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <img className="slider-image w-100" src={image5} alt="slide-img" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                        <div className="slide-text mx-auto mt-3">
                            <h2 className="text-header">Karty prezentowe</h2>
                            <p className="text-content">Uwolnij swoją kreatywność zakupową</p>
                            <button type="button" className="btn btn-outline-primary btn-sign-up">WIĘCEJ</button>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>

    );
}

export default SingleSlider;