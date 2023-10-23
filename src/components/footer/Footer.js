import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.png'

const Footer = (props) => {
  return (
    <div className="tp-site-footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-image">
              <Link className="logo" to="/"><img src={Logo} alt="" /></Link>
            </div>
          </div>
          <div className="col-12">
            <div className="link-widget">
              <ul>
                <li><a href="https://github.com/Youngermaster"><i className="ti-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/juan-manuel-young-hoyos"><i className="ti-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/jmyounghoyos"><i className="ti-instagram"></i></a></li>
                <li><a href="https://www.youtube.com/channel/UCyuYHymUH4Adj2YytTdtD4g/videos"><i className="ti-youtube"></i></a></li>
                <li><a href="https://twitter.com/jmyounghoyos"><i className="ti-twitter-alt"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="col-12">
            <div className="copyright">
              <p>© 2023. All rights reserved by Juan Manuel Young Hoyos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;