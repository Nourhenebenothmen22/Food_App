import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
 

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🍕</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your food account</p>
        </div>

        <form className="auth-form" >
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
             
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                name="password"
                className="form-input"
                placeholder="Enter your password"
               
                required
              />
              <button
                type="button"
                className="toggle-password"
               
              >
              
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Sign In
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