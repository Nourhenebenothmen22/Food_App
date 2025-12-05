import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

// URL du backend via .env
const API_URL = import.meta.env.VITE_API_URL;

// Config axios
axios.defaults.withCredentials = true;

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!data.email || !data.password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, data, {
        withCredentials: true
      });

      if (response.data.message === "Login successful") {

        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role
        };

        localStorage.setItem('user', JSON.stringify(userData));

        toast.success('Login successful!', {
          autoClose: 1500,
          onClose: () => navigate('/')
        });

        setData({ email: "", password: "" });

      } else {
        toast.error(response.data.message || 'Login failed');
      }

    } catch (error) {
      console.error('Login error:', error);

      if (error.response?.status === 401) toast.error('Invalid email or password');
      else if (error.response?.status === 404) toast.error('User not found');
      else if (error.response?.status === 429) toast.error('Too many attempts');
      else toast.error('Server error. Please try again.');
      
    } finally {
      setIsLoading(false);
    }
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
