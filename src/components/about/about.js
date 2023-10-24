import React from 'react'
import profile from '../../images/about/jmyounghoyos.JPG'

const About = (props) => {
  return (
    <section className="tf-about-section section-padding">
      <div className="container">
        <div className="tf-about-wrap">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="tf-about-img">
                <img src={profile} alt="" />
                <div className="tf-about-img-text">
                  <div className="tf-about-icon">
                    <h3>3+</h3>
                    <span>Years of Exprience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="tf-about-text">
                <small>about Me</small>
                <h2><span>Problems</span>? Consider Them <span>Solved</span> & <span>Coded</span></h2>
                <h5>With 3+ years in the tech industry, I focus
                  on crafting solutions that matter.</h5>
                <p>
                  From intricate algorithms to intuitive user
                  interfaces, each project I undertake is a
                  journey of turning challenges into
                  functional solutions. The thrill isn't just
                  in coding, but ensuring what I craft stands
                  robust against threats (Security), bridging
                  the gap between the digital and physical
                  world (IOT).
                </p>

                <div className="tf-funfact row justify-content-center text-center">
                  <div className="tf-funfact-item col-md-4 col-sm-6 mt-3">
                    <h3><span>40+</span></h3>
                    <p>Challenges Tackled</p>
                  </div>
                  <a href='https://profile.codersrank.io/user/youngermaster' className="col-md-4 col-sm-6">
                    <div className="tf-funfact-item mt-3">
                      <h3><span>60+</span></h3>
                      <p>Languages & Tools Used</p>
                    </div>
                  </a>
                  <div className="tf-funfact-item col-md-4 col-sm-6 mt-3">
                    <h3><span>4</span>+</h3>
                    <p>Awards Won</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="visible-rotate-text">
        <h1>Problem Solver</h1>
      </div>
    </section>
  )
}

export default About;