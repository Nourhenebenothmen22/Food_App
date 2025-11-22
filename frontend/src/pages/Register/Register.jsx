import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Register.css';

const url = "http://localhost:5000/api/v1/auth";

function Register() {
  const [formData, setFormData] = useState({
    name: '', // Changé de fullName à name
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role: role
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields', {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long', {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration data:', formData);
      
      const response = await axios.post(`${url}/register`, formData, {
        withCredentials: true 
      });

      console.log('Registration successful:', response.data);
      
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          navigate('/login');
        }
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
      });

    } catch (error) {
      console.error('Full registration error:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Meilleure gestion d'erreur
      if (error.response?.data?.error) {
        // Afficher l'erreur spécifique de validation MongoDB
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.', {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error('Registration failed. Please check your connection.', {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🍔</div>
          <h1>Create Account</h1>
          <p>Join our food community today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <div className="role-options">
              <div 
                className={`role-option ${formData.role === 'user' ? 'selected' : ''}`}
                onClick={() => handleRoleSelect('user')}
              >
                <span className="role-icon">👤</span>
                User
              </div>
              <div 
                className={`role-option ${formData.role === 'admin' ? 'selected' : ''}`}
                onClick={() => handleRoleSelect('admin')}
              >
                <span className="role-icon">👑</span>
                Admin
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;