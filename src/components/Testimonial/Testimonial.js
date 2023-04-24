import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





const Testimonials = [
    {
        name: 'Elezabeth Marvel',
        title: 'Photographer',
        descriptoion: '“To identify key portfolio features, varied styles, and organizational schemes; to begin to identify aspects of students’ own portfolios that will need careful attention.”',
    },
    {
        name: 'Marry Jenefer',
        title: 'CEO Of Golden Bravo',
        descriptoion: '“That will need careful attention To begin to identify aspects of students’ own portfolios To identify key portfolio features, varied styles, and organizational schemes.”',
    },
    {
        name: 'Elezabeth Marvel',
        title: 'Photographer',
        descriptoion: '“Varied styles, and organizational schemes; to begin to identify aspects of students’ own portfolios To identify key portfolio features, that will need careful attention.”',
    },
    {
        name: 'Marry Jenefer',
        title: 'CEO Of Golden Bravo',
        descriptoion: '“To begin to identify aspects of students’ own portfolios To identify key portfolio features, varied styles, and organizational schemes; that will need careful attention.”',
    },
]



const Testimonial = () => {

    var settings = {
        dots: false,
        arrows: false,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <section className="tp-testimonial-section section-padding">
            <div className="container">
                <div className="tp-section-title">
                    <span>Testimonials</span>
                    <h2>What My clients say.</h2>
                </div>

                <div className="tp-testimonial-wrap">
                    <Slider {...settings}>
                        {Testimonials.map((tstml, tsm) => (
                            <div className="tp-testimonial-item" key={tsm}>
                                <div className="tp-testimonial-text">
                                    <p>{tstml.descriptoion}</p>
                                    <span>{tstml.name}</span>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="visible-rotate-text">
                <h1>Review</h1>
            </div>
        </section>
    )
}

export default Testimonial;