
import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';


const VideoModal = () => {
  
  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7Jv48RQ_2gk" onClose={() => setOpen(false)} />

      <div className="video-btn">
        <ul>
          <li>
            <button className="btn-wrap" onClick={() => setOpen(true)}><i className="fi flaticon-play-buttton" aria-hidden="true"></i></button>
          </li>
        </ul>
      </div>

    </React.Fragment>
  )
}

export default VideoModal;