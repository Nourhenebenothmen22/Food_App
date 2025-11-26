import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { 
    currentUser, 
    getTotalCartItems, 
    handleUserLogout,
    syncCartWithUser 
  } = useContext(StoreContext);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Utiliser la fonction de déconnexion du contexte
    handleUserLogout();
    
    // Supprimer les données utilisateur du localStorage
    localStorage.removeItem('user');
    
    // Supprimer les cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Rediriger vers la page d'accueil
    navigate('/');
    
    // Fermer le menu mobile si ouvert
    closeMenu();
  };

  // Synchroniser le panier avec l'utilisateur actuel
  useEffect(() => {
    syncCartWithUser();
  }, []);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user_dropdown_container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className='navbar'>
      
      {/* LEFT SECTION - Logo */}
      <div className='navbar_left'>
        <Link to="/" onClick={closeMenu}>
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
          <button 
            className='icon_btn' 
            title="Search products"
            onClick={closeMenu}
          >
            <img 
              src={assets.search_icon} 
              alt="Search" 
              className='search_icon' 
            />
          </button>
        </div>

        {/* Shopping Basket */}
        <div className='basket_container'>
          <Link to="/cart" onClick={closeMenu}>
            <button className='icon_btn' title="View cart">
              <img 
                src={assets.basket_icon} 
                alt="Shopping Basket" 
                className='basket_icon' 
              />
              <div className={`dot ${getTotalCartItems() > 0 ? '' : 'hidden'}`} 
                   title={`${getTotalCartItems()} items in cart`}>
              </div>
            </button>
          </Link>
        </div>

        {/* User Profile or Auth Buttons */}
        {currentUser ? (
          <div className="user_dropdown_container">
            
            {/* User Icon Button */}
            <button 
              className="user_icon_btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(prev => !prev);
              }}
              title="User Menu"
            >
              👤
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown_menu">
                <span>
                  Hi, {currentUser?.name?.split(' ')[0] || currentUser?.email?.split('@')[0]}
                </span>

                <button onClick={() => {
                  navigate('/profile');
                  setShowDropdown(false);
                  closeMenu();
                }}>
                  📱 Profile
                </button>

                <button onClick={() => {
                  navigate('/orders');
                  setShowDropdown(false);
                  closeMenu();
                }}>
                  📦 My Orders
                </button>

                <button onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu}>
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
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;