import React from "react";
// import himg from '../../images/slider/right-img.png'
import himg from '../../images/Younger.svg'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <section className="tp-hero-section-1">
      <div className="container">
        <div className="row">
          <div className="col col-xs-7 col-lg-7">
            <div className="tp-hero-section-text">
              <div className="tp-hero-title">
                <h2>Problem <br /> Solver</h2>
              </div>
              <div className="tp-hero-sub">
                <p><span>J</span>uan <span>M</span>anuel <span>Y</span>oung <span>H</span>oyos</p>
              </div>
              <div className="btns">
                <Link activeClass="active" to="contact" spy={true} smooth={true} duration={500} offset={-95} className="theme-btn">Contact Me</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-vec">
        <div className="right-img">
          <img src={himg} alt="" />
        </div>
      </div>
      <div className="social-link">
        <ul>
          <li><a href="https://www.instagram.com/jmyounghoyos/">Instagram</a></li>
          <li><a href="https://www.linkedin.com/in/juan-manuel-young-hoyos/">LinkedIn</a></li>
          <li><a href="https://github.com/Youngermaster">GitHub</a></li>
        </ul>
      </div>
      <div className="visible-text">
        <h1>
          DEVSECOPS<br />
          IOT AI<br />
          APPS<br />
        </h1>
      </div>
    </section>
  )
}

export default Hero;