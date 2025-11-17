import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);
  return (
    <nav className='navbar'>
      
      {/* LEFT SECTION - Logo */}
      <div className='navbar_left'>
        <Link to="/">
          <img 
            src={assets.logo} 
            alt="Company Logo" 
            className='logo' 
          />
        </Link>
      </div>

      {/* CENTER SECTION - Navigation Menu */}
      <div className='navbar_center'>
        <ul className={`navbar_menu ${isMenuOpen ? 'active' : ''}`}>
          <li onClick={closeMenu}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/menu">Menu</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/app">Mobile App</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/contact">Contact Us</Link>
          </li>
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
          <Link to="/cart">
            <img 
              src={assets.basket_icon} 
              alt="Shopping Basket" 
              className='basket_icon' 
              title="View cart"
            />
<div className={getTotalCartAmount(cartItems, food_list) == 0 ? "" : 'dot'} title="Items in cart"></div>
          </Link>
        </div>

        {/* Sign In Button */}
        <Link to="/login">
          <button 
            className='sign_in_btn'
            title="Sign in to your account"
          >
            Sign In
          </button>
        </Link>

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