import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="logo-container">
            <img src={assets.logo} alt="Logo" className="footer-logo" />
          </div>
          <p className="footer-description">
            Transforming your daily experience with cutting-edge solutions and reliable technology for modern life.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>benothmennourhen8@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+1 (234) 567-890</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>New York, NY</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 All rights reserved. | Crafted with passion</p>
      </div>
    </footer>
  );
}

export default Footer;
