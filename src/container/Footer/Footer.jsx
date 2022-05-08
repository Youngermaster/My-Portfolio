import React from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const Footer = () => (
  <>
    <h2 className="head-text">Connect with me</h2>

    <div className="app__footer-cards">
      <div className="app__footer-card ">
        <img src={images.email} alt="email" />
        <a href="mailto:hello@micael.com" className="p-text">hello@micael.com</a>
      </div>
      <div className="app__footer-card">
        <img src={images.mobile} alt="phone" />
        <a href="tel:+1 (123) 456-7890" className="p-text">+1 (123) 456-7890</a>
      </div>
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
