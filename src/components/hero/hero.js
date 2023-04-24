import React from "react";
import { NavLink } from 'react-router-dom'
import himg from '../../images/slider/right-img.png'
import { Link } from 'react-scroll'

const Hero =() => {
    return (
        <section className="tp-hero-section-1">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-7 col-lg-7">
                        <div className="tp-hero-section-text">
                            <div className="tp-hero-title">
                                <h2>App & Software Developer</h2>
                            </div>
                            <div className="tp-hero-sub">
                                <p>Robert Miller</p>
                            </div>
                            <div className="btns">
                                <Link activeClass="active" to="contact" spy={true} smooth={true} duration={500} offset={-95} className="theme-btn">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-vec">
                <div className="right-img">
                    <img src={himg} alt=""/>
                </div>
            </div>
            <div className="social-link">
                <ul>
                    <li><NavLink to="/">Facebook</NavLink></li>
                    <li><NavLink to="/">Twitter</NavLink></li>
                    <li><NavLink to="/">Instagram</NavLink></li>
                </ul>
            </div>
            <div className="visible-text">
                <h1>Developer</h1>
            </div>
        </section>
    )
}

export default Hero;