import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import tractor from "../../assets/tractor.mp4";
import logo34 from "../../assets/logo34.png";
import { Eye, EyeOff } from 'lucide-react'; // Import Eye icons from lucide-react

const Login = () => {
  const navigate = useNavigate();
  const [formText, setFormText] = useState("");
  const [formIndex, setFormIndex] = useState(0);
  const formQuote = "The fusion of technology and agriculture gives rise to innovation, cultivating a greener and more bountiful tomorrow.";
  
  // Add state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Define the credentials that will allow login
  const validEmail = "group25@agricsmart.com";
  const validPassword = "123";
  
  useEffect(() => {
    // Clear any authentication on component mount
    localStorage.removeItem('isAuthenticated');
    
    if (formIndex < formQuote.length) {
      const timeout = setTimeout(() => {
        setFormText(prevText => prevText + formQuote[formIndex]);
        setFormIndex(prevIndex => prevIndex + 1);
      }, 35);
      
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setFormText("");
        setFormIndex(0);
      }, 2000); 
      
      return () => clearTimeout(resetTimeout);
    }
  }, [formIndex]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (email === validEmail && password === validPassword) {
      // Set authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      
      // Route to dashboard if credentials match
      navigate("/dashboard");
    } else {
      // Show error message
      setError("Invalid email or password");
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  
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
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <label></label>
          <input 
            type="text" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          
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