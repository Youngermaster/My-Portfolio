import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiHackthebox } from 'react-icons/si';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://github.com/Youngermaster/" title="GitHub">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href="https://app.hackthebox.com/profile/643960" title="Hack The Box">
        <SiHackthebox />
      </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/juan-manuel-young-hoyos/" title="LinkedIn">
        <BsLinkedin />
      </a>
    </div>
  </div>
);

export default SocialMedia;
