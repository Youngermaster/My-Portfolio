
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pimg1 from '../../../images/partners/1.png'
import pimg2 from '../../../images/partners/2.png'
import pimg3 from '../../../images/partners/3.png'
import pimg4 from '../../../images/partners/4.png'

const PartnerSlider = () => {

  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    margin: 10,
    loop: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section className="partners-section">
      <h2 className="hidden">partner</h2>
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="partner-grids partners-slider">
              <Slider {...settings}>
                <div className="grid">
                  <img src={pimg1} alt="" />
                </div>
                <div className="grid">
                  <img src={pimg2} alt="" />
                </div>
                <div className="grid">
                  <img src={pimg3} alt="" />
                </div>
                <div className="grid">
                  <img src={pimg4} alt="" />
                </div>
                <div className="grid">
                  <img src={pimg2} alt="" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnerSlider;




