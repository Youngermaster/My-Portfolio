import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Achievements.scss';

import achievements from '../../constants/achievements';
import brands from '../../constants/brands';

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <h2 className="head-text">Some of my <span>Achievements</span></h2>
      <br />
      {achievements.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={achievements[currentIndex].image} alt={achievements[currentIndex].name} />
            <div className="app__testimonial-content">
              <p className="p-text">{achievements[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{achievements[currentIndex].name}</h4>
                <h5 className="p-text">{achievements[currentIndex].company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? achievements.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={() => handleClick(currentIndex === achievements.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={brand.image} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Achievements, 'app__testimonial'),
  'achievements',
  'app__primarybg',
);
