import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

function Navbar() {
  return (
    <nav className='navbar'>
      {/* Logo */}
      <div className='navbar_left'>
        <img src={assets.logo} alt="Logo" className='logo' />
      </div>

      {/* Menu */}
      <ul className='navbar_menu'>
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>

      {/* Right section */}
      <div className='navbar_right'>
        <img src={assets.search_icon} alt="Search" className='search_icon' />

        <div className='basket_container'>
          <img src={assets.basket_icon} alt="Basket" className='basket_icon' />
          <div className='dot'></div>
        </div>

        <button className='sign_in_btn'>Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;
