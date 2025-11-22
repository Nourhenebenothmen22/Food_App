import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est connecté
  const isLoggedIn = localStorage.getItem('user');
  const user = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const [showDropdown, setShowDropdown] = useState(false);


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Supprimer les données utilisateur du localStorage
    localStorage.removeItem('user');
    
    // Supprimer les cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Rediriger vers la page d'accueil
    navigate('/');
    
    // Fermer le menu mobile si ouvert
    closeMenu();
  };

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
            <div className={getTotalCartAmount(cartItems, food_list) === 0 ? "" : 'dot'} title="Items in cart"></div>
          </Link>
        </div>

       {/* User Profile or Auth Buttons */}
{isLoggedIn ? (
  <div className="user_dropdown_container">
    
    {/* User Icon Button */}
    <button 
      className="user_icon_btn"
      onClick={() => setShowDropdown(prev => !prev)}
      title="User Menu"
    >
      👤
    </button>

    {/* Dropdown Menu */}
    {showDropdown && (
      <div className="dropdown_menu">
        <span style={{ padding: "8px 0", fontWeight: "bold" }}>
          Hi, {user?.name?.split(' ')[0] || user?.email?.split('@')[0]}
        </span>

        <button onClick={() => navigate('/profile')}>
          Profile
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    )}

  </div>
) : (
  <Link to="/login">
    <button className='sign_in_btn' title="Sign in to your account">
      Sign In
    </button>
  </Link>
)}


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