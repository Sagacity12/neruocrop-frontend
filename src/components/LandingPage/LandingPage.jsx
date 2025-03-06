import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="logo">
        <img src="src/assets/logo34white.png" alt="AgricSmart Logo" />
        <h2>AgricSmart</h2>
      </div>
      
      <div className="message">
        <h1>Welcome to AgricSmart</h1>
        
        <p className="typing-container">A single-stage hub for farming insights, materials, equipment,
        and networking to enhance efficiency earnings</p> 
        <div className="getStarted">
          <Link to="/Login">
            <button className="Get-StartedBtn">GET STARTED</button>
          </Link>
        </div> 
      </div>
    </div>
  );
};

export default LandingPage;