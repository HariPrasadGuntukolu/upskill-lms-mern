import React from "react";
import "./footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2025 UpSkill Platform. All Rights Reserved. <br />
          <a href="#">Hari Prasad Guntukolu</a>
        </p>
        <div className="social-links">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaSquareFacebook />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
