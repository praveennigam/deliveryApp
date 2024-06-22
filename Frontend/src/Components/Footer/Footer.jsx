import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa"; // Ensure this line is correct
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} className="logom" alt="Logo" />
          <p>Discover, Dine, Delight</p>
          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/_its_praveen_?igsh=MWR5a25yY2lycTRkNg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={40} />
            </a>
            <a
              href="https://www.linkedin.com/in/impraveen1999?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={40} />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-910-948-1480</li>
            <li>
              <a href="mailto:praveennigam1999@gmail.com">
                praveennigam1999@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ By Praveen.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
