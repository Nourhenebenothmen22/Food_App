import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const url = "http://localhost:5000/api/v1/auth";

// Configuration axios pour accepter les cookies
axios.defaults.withCredentials = true;

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev, 
      [name]: value 
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation basique
    if (!data.email || !data.password) {
      toast.error('Please fill in all fields', {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/login`, data, {
        withCredentials: true // Important pour les cookies
      });
      
      if (response.data.message === "Login successful") {
        // Stocker les données utilisateur dans localStorage
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role
        };

        localStorage.setItem('user', JSON.stringify(userData));

        // Afficher le toast AVANT la redirection
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            // Redirection APRÈS la fermeture du toast
            navigate('/');
          }
        });
        
        // Réinitialiser le formulaire
        setData({
          email: "",
          password: ""
        });

        console.log('User logged in:', userData);
        console.log('Cookies should be set automatically');

      } else {
        toast.error(response.data.message || 'Login failed', {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Gestion d'erreurs spécifiques
      if (error.response?.status === 401) {
        toast.error('Invalid email or password', {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (error.response?.status === 404) {
        toast.error('User not found', {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (error.response?.status === 429) {
        toast.error('Too many attempts. Please try again later.', {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection.', {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(error.response?.data?.message || 'An error occurred. Please try again.', {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour vérifier les cookies (debug)
  const checkCookies = () => {
    console.log('Cookies:', document.cookie);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🍕</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your food account</p>
        </div>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              onChange={onChangeHandler}
              value={data.email}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                onChange={onChangeHandler}
                value={data.password}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/register" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;