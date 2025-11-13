import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='navbar'>
      
      {/* LEFT SECTION - Logo */}
      <div className='navbar_left'>
        <img 
          src={assets.logo} 
          alt="Company Logo" 
          className='logo' 
        />
      </div>

      {/* CENTER SECTION - Navigation Menu */}
      <div className='navbar_center'>
        <ul className={`navbar_menu ${isMenuOpen ? 'active' : ''}`}>
          <li onClick={closeMenu}>Home</li>
          <li onClick={closeMenu}>Menu</li>
          <li onClick={closeMenu}>Mobile App</li>
          <li onClick={closeMenu}>Contact Us</li>
        </ul>
      </div>

      {/* RIGHT SECTION - User Actions */}
      <div className='navbar_right'>
        
        {/* Search Icon */}
        <div className='search_container'>
          <img 
            src={assets.search_icon} 
            alt="Search" 
            className='search_icon' 
            title="Search products"
          />
        </div>

        {/* Shopping Basket */}
        <div className='basket_container'>
          <img 
            src={assets.basket_icon} 
            alt="Shopping Basket" 
            className='basket_icon' 
            title="View cart"
          />
          <div className='dot' title="Items in cart"></div>
        </div>

        {/* Sign In Button */}
        <button 
          className='sign_in_btn'
          title="Sign in to your account"
        >
          Sign In
        </button>

        {/* Burger Menu for Mobile */}
        <button 
          className='burger_menu'
          onClick={handleMenuToggle}
          title="Toggle navigation menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;