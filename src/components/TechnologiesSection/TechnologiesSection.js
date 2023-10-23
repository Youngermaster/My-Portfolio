import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import technologies from '../../api/technologies';

const TechnologiesSection = () => {
  const [number, setCount] = useState(18);
  const [buttonActive, setButtonState] = useState(true);

  return (
    <section className="tp-blog-section section-padding" id="blog">
      <div className="container">
        <div className="tp-section-title">
          <span>Technologies</span>
          <h2>Technologies I mainly use</h2>
        </div>
        <div className="tp-blog-items">
          <div className="row">
            {technologies.slice(0, number).map((tech, index) => (
              <div className="col col-lg-3 col-md-6 col-12" key={tech.id}>
                <div className="tp-blog-item">
                  <div className="tp-blog-img">
                    <img src={tech.image} alt={tech.name} />
                  </div>
                  <div className="tp-blog-content">
                    <h1>{tech.name}</h1>
                    <p>{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className={`sec-title-btn text-center mt-3 ${buttonActive ? "d-none" : ""}`}>
            <span onClick={() => setButtonState(!buttonActive)}>
              <button className="theme-btn" onClick={() => setCount(number + 8)}>
                View All Technologies
              </button>
            </span>
          </div> */}
        </div>
      </div>
      <div className="visible-rotate-text">
        <h1>
          Tech
          <br />
          Stack
        </h1>
      </div>
    </section>
  );
};

export default TechnologiesSection;
