import React from 'react';
import { Link } from 'react-router-dom';
import logo34 from "../../assets/logo34.png";
import './Forgot.css';

const Forgot = () => {
  return (
    <div className="login-container">
      <div className="signin-section">
        <div className="company-header">
          <img src={logo34} alt="Company Logo" className="company-logo" />
          <h2>AgricSmart</h2>
        </div>
        <div className="static-message">
          <p>Reset your password securely and regain access to your AgricSmart account in just a few simple steps.</p>
        </div>
        
        <form>
          <h4 className="forgot-title">Forgot Password</h4>
          <label></label>
          <input type="email" placeholder="Enter your email" />
          
          <button type="submit" className="sign-in-btn">Send Reset Link</button>
          <p className="signup">Go back to <Link to="/login"><span className="signup-link">Login</span></Link></p>
        </form>
      </div>
      <div className="image2-container">
        <img src="src/assets/veggies.jpg" alt="Agriculture" className="side-image" />
      </div>
    </div>
  );
};

export default Forgot;