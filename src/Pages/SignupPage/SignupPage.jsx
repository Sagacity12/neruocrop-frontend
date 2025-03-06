import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo34 from "../../assets/logo34.png";
import "./SignupPage.css";

const Signup = () => {
  // Animation for signup form
  const [formText, setFormText] = useState("");
  const [formIndex, setFormIndex] = useState(0);
  const formQuote = "Join our community of agricultural innovators and transform the way we grow tomorrow.";
  
  // Animation for right side
  const [animatedText, setAnimatedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const animatedQuotes = [
    "Ready to grow with us?",
    "Smart farming starts with smart people. Be part of the agricultural revolution.",
    "From seed to success, our technology empowers farmers to achieve more with less."
  ];
  
  
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
      }, 10000); // Wait 10 seconds before restarting
      
      return () => clearTimeout(resetTimeout);
    }
  }, [formIndex]);
  
  // Right side animation effect
  useEffect(() => {
    const currentQuote = animatedQuotes[quoteIndex];
    
    if (isTyping && textIndex < currentQuote.length) {
      const timeout = setTimeout(() => {
        setAnimatedText(prevText => prevText + currentQuote[textIndex]);
        setTextIndex(prevIndex => prevIndex + 1);
      }, 50); 
      
      return () => clearTimeout(timeout);
    } else if (isTyping) {
      const pauseTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      
      return () => clearTimeout(pauseTimeout);
    } else if (!isTyping && animatedText.length > 0) {
      
      const deleteTimeout = setTimeout(() => {
        setAnimatedText(prevText => prevText.slice(0, -1));
      }, 30);
      
      return () => clearTimeout(deleteTimeout);
    } else {
    
      const nextQuoteTimeout = setTimeout(() => {
        setQuoteIndex((prevQuoteIndex) => (prevQuoteIndex + 1) % animatedQuotes.length);
        setTextIndex(0);
        setIsTyping(true);
      }, 500);
      
      return () => clearTimeout(nextQuoteTimeout);
    }
  }, [textIndex, quoteIndex, animatedText, isTyping]);
  
  return (
    <div className="signup-container">
      <div className="signup-section">
        <div className="company-header">
          <img src={logo34} alt="Company Logo" className="company-logo" />
          <h2>AgricSmart</h2>
        </div>
        <div className="typing-animation">
          <p>{formText}</p>
        </div>
        <button className="google-signup">
          <img src="src/assets/google.png" alt="Google logo" />
          Sign up with Google
        </button>
        
        <div className="or-divider">
          <span>OR</span>
        </div>
        <form>
          <div className="name-fields">
            <div className="field-group">
              <label></label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="field-group">
              <label></label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div>

          <label></label>
          <input type="email" placeholder="Email Address" />

          <label></label>
          <input type="password" placeholder="Create Password" />
        
          <label></label>
          <input type="password" placeholder="Confirm Password" />

          <button type="submit" className="sign-up-btn">Create Account</button>
          <p className="login-link">Already have an account? <Link to="/login"><span className="login-text">Sign In</span></Link></p>
        </form> 
      </div>
      <div className="animated-text-container">
        <div className="animated-text-box">
          <p>{animatedText}<span className="cursor-blink">|</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;