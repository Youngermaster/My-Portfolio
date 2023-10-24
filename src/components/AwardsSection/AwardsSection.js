import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import awards from '../../api/awards'
import AwardSingle from "../AwardSingle";
import { Link } from 'react-router-dom'

const AwardsSection = () => {

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({})

  const handleClickOpen = (item) => {
    setOpen(true);
    setState(item)
  }

  const [number, setCount] = useState(3);
  const [buttonActive, setButtonState] = useState(false);
  return (
    <section className="tp-blog-section section-padding" id="blog">
      <div className="container">
        <div className="tp-section-title">
          <span>Awards</span>
          <h2>My Latest Achievements</h2>
        </div>
        <div className="tp-blog-items">
          <div className="row">
            {awards.slice(0, number).map((blog, bl) => (
              <div className="col col-lg-4 col-md-6 col-12" key={bl}>
                <div className="tp-blog-item" onClick={() => handleClickOpen(blog)}>
                  <div className="tp-blog-img">
                    <img src={blog.screens} alt="" />
                  </div>
                  <div className="tp-blog-content">
                    <ul>
                      <li>{blog.create_at}</li>
                      <li>At {blog.location}</li>
                    </ul>
                    <h2 >{blog.title}</h2>
                    <p>{blog.description.substring(0, 150) + '...'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`sec-title-btn text-center mt-3 ${buttonActive ? "d-none" : ""}`}>
            <span onClick={() => setButtonState(!buttonActive)}>
              <button className="theme-btn" onClick={() => setCount(number + number)}>
                View All Achievements
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="visible-rotate-text">
        <h1>My Latest Awards</h1>
      </div>
      <AwardSingle open={open} onClose={handleClose} title={state.title} bImg={state.blogSingleImg} create_at={state.create_at} author={state.author} comment={state.comment} description={state.description} />
    </section>
  );
}

export default AwardsSection;