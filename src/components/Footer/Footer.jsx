import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

function Footer() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Listen for changes in sidebar state
  useEffect(() => {
    const checkSidebarState = () => {
      const mainWrapper = document.querySelector('.main-wrapper');
      if (mainWrapper) {
        setSidebarCollapsed(mainWrapper.classList.contains('sidebar-collapsed'));
      }
    };
    
    // Check initial state
    checkSidebarState();
    
    // Use MutationObserver to detect class changes on main-wrapper
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(mainWrapper, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-about">
            <h3 className="footer-title">AgricSmart</h3>
            <p className="footer-description">
              Empowering farmers with technology and education to revolutionize agriculture and promote sustainable farming practices.
            </p>
          </div>
          
          <div className="footer-contact">
            <h4 className="footer-subtitle">Contact Us</h4>
            <ul className="contact-list">
              <li className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Farm Road, KNUST, AR 12345</span>
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" />
                <span>+233 50 427 8893</span>
              </li>
              <li className="contact-item">
                <Mail className="contact-icon" />
                <span>contact@agrismart.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} AgricSmart. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;