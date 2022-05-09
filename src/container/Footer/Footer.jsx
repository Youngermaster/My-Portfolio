import React from 'react';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

import socials from '../../constants/socials';

const Footer = () => (
  <>
    <h2 className="head-text"><span>Connect</span> with me</h2>

    <div className="app__footer-cards">
      {socials.map((social) => (
        <div className="app__footer-card">
          <img src={social.image} alt={social.text} />
          <a href={social.url} target="_blank" rel="noopener noreferrer" className="p-text">{social.text}</a>
        </div>
      ))}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
