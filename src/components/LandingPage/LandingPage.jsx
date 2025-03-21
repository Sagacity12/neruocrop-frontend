import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <motion.div 
        className="logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="src/assets/logo34white.png" alt="AgricSmart Logo" />
        <h2>AgricSmart</h2>
      </motion.div>
      
      <motion.div 
        className="content-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-content">
          <motion.h1 
            className="main-heading"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The gateway to<br />
            sustainable agriculture<br />
            and food security
          </motion.h1>
          
          <motion.p 
            className="sub-heading"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A single-hub for farming insights, materials
            equipment, and networking to enhance efficiency earnings.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/login">
              <motion.button 
                className="get-started-btn"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "green" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
       

<motion.div 
  className="right-content"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.7 }}
>
  <motion.div 
    className="vertical-line"
    initial={{ height: 0 }}
    animate={{ height: "100%" }}
    transition={{ duration: 0.8, delay: 0.7 }}
  />
  
  <motion.div 
    className="side-brand"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 1.1 }}
  >
    AgricSmart
  </motion.div>
</motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;