import React from 'react'
import aImg from '../../images/about/img-1.jpg'

const About = (props) => {
    return (
        <section className="tf-about-section section-padding">
            <div className="container">
                <div className="tf-about-wrap">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="tf-about-img">
                                <img src={aImg} alt="" />
                                <div className="tf-about-img-text">
                                    <div className="tf-about-icon">
                                        <h3>3+</h3>
                                        <span>Years Exprience</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="tf-about-text">
                                <small>about Me</small>
                                <h2>Welcome to Tonu, Best Software Services</h2>
                                <h5>I have 3+ years of experiences in Software Development for give you better services.</h5>
                                <p>A wonderful serenity has taken possession of my entire soul, like these sweet
                                    mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm
                                    of existence in this spot, which was created for the bliss of souls like mine. I am
                                    so happy, my dear friend, so absorbed in the exquisite </p>

                                <div className="tf-funfact">
                                    <div className="tf-funfact-item">
                                        <h3><span>500</span>+</h3>
                                        <p>Projects Completed</p>
                                    </div>
                                    <div className="tf-funfact-item">
                                        <h3><span>52</span>+</h3>
                                        <p>Awards Win</p>
                                    </div>
                                    <div className="tf-funfact-item">
                                        <h3><span>2</span>M+</h3>
                                        <p>Happy clients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="visible-rotate-text">
                <h1>About Me</h1>
            </div>
        </section>
    )
}

export default About;