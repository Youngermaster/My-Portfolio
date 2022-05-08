import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
// import { urlFor } from '../../client';

import { images } from '../../constants';
import abouts from '../../constants/abouts';

const About = () => (
  <>
    <h2 className="head-text"><span>Intelligence</span> is only noticed <br /> when it <span>Contributes something</span></h2>

    <div className="app__profiles">
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: 'tween' }}
        className="app__profile-item"
        key="test"
      >
        <img src={images.kali} alt="Test" />
        <h2 className="bold-text" style={{ marginTop: 20 }}>Test</h2>
        <p className="p-text" style={{ marginTop: 10 }}>Test</p>
      </motion.div>
    </div>

    <div className="app__profiles">
      {abouts.map((about, index) => (
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className="app__profile-item"
          key={about.title + index}
        >
          <img src={about.image} alt={about.title} />
          <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
          <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
        </motion.div>
      ))}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
