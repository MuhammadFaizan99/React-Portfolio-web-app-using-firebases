import React from "react";
import "./Footer.css"; // Create a CSS file for the footer styles

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a href="https://www.facebook.com/profile.php?id=100016919023499">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/faf2001f/">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCpk4r4QiS2DDW0TQKz6Lq9A">
            <i className="fa fa-youtube"></i>
          </a>
          <a href="https://github.com/MuhammadFaizan99">
            <i className="fa fa-github"></i>
          </a>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="#">HOME</a>
            </li>
            <li>
              <a href="#">ABOUT</a>
            </li>
            <li>
              <a href="#">PROJECTS</a>
            </li>
            <li>
              <a href="#">CONTACT</a>
            </li>
          </ul>
        </div>

        <div className="row">
          CodeTech Copyright © {date.getFullYear()} CodeTech - All rights
          reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
