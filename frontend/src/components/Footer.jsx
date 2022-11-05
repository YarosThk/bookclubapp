import React from 'react';
import { FaInstagram, FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer-message">Follow us for updates</h2>
      <div className="media-icons">
        <FaInstagram />
        <FaGithub />
        <FaYoutube />
        <FaTwitter />
      </div>
    </div>
  );
}

export default Footer;
