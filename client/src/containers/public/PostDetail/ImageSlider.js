import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.scss';

const ImageSlider = ({ images }) => {
    const settings = {
        centerMode: true,
        centerPadding: '5px',
        dots: true,
        customPaging: function (i) {
            return <img width="20px" height="20px" src={paths[i]} alt="thumbnail" />;
        },

        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                },
            },
        ],
    };
    const [paths, setPaths] = useState([]);
    useEffect(() => {
        images && setPaths(Object.values(JSON.parse(images)));
    }, [images]);

    return (
        <div className="slider-container p-0">
            <div className="slider">
                <Slider {...settings} className="text-center bg-dark">
                    {paths.length > 0 &&
                        paths.map((path) => {
                            return <img src={path} alt="thumbnail" key={path} className="image-slider" />;
                        })}
                </Slider>
            </div>
        </div>
    );
};

export default ImageSlider;
