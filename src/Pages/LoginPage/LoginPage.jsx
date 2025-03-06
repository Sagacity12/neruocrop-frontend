import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import tractor from "../../assets/tractor.mp4";
import logo34 from "../../assets/logo34.png";

const Login = () => {
  
  const [formText, setFormText] = useState("");
  const [formIndex, setFormIndex] = useState(0);
  const formQuote = "The marriage of technology and agriculture births innovation, cultivating a greener and more bountiful tomorrow.";
  
  
  useEffect(() => {
    if (formIndex < formQuote.length) {
      const timeout = setTimeout(() => {
        setFormText(prevText => prevText + formQuote[formIndex]);
        setFormIndex(prevIndex => prevIndex + 1);
      }, 25);
      
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setFormText("");
        setFormIndex(0);
      }, 2000); 
      
      return () => clearTimeout(resetTimeout);
    }
  }, [formIndex]);
  
  return (
    <div className="login-container">
      <div className="signin-section">
        <div className="company-header">
          <img src={logo34} alt="Company Logo" className="company-logo" />
          <h2>AgricSmart</h2>
        </div>
        <div className="typing-animation">
          <p>{formText}</p>
        </div>
        <button className="google-login">
          <img src="src/assets/google.png" alt="Google logo" />
          Continue with Google
        </button>
        
        <div className="or-divider">
          <span>OR</span>
        </div>
        <form>
          <label></label>
          <input type="text" placeholder="Enter your email" />

          <label></label>
          <input type="password" placeholder="Enter your password" />
          <div className="forgot-password">
            <Link to="/reset-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="sign-in-btn">Sign In</button>
          <p className="signup">Don't have an account? <Link to="/signup"><span className="signup-link">Sign Up</span></Link></p>
        </form> 
      </div>
      <div className="image2-container">
      
        <video 
          className="side-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={tractor} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Login;