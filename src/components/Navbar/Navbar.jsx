import React from 'react';
import './Navbar.css';

function Navbar() {
  const scrollToFooter = (section) => {
    // Find the footer element
    const footer = document.querySelector('.footer');
    
    if (footer) {
      // Scroll to the footer
      footer.scrollIntoView({ behavior: 'smooth' });
      
      // If we need to highlight a specific section in the footer
      if (section === 'contact') {
        // Focus on the contact section if needed
        const contactSection = document.querySelector('.footer-contact');
        if (contactSection) {
          contactSection.focus();
        }
      } else if (section === 'about') {
        // Focus on the about section if needed
        const aboutSection = document.querySelector('.footer-about');
        if (aboutSection) {
          aboutSection.focus();
        }
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="#about" className="nav-link-top" onClick={(e) => {
          e.preventDefault();
          scrollToFooter('about');
        }}>About Us</a>
        <a href="#" className="nav-link-top">FAQS</a>
        <a href="#contact" className="nav-link-top" onClick={(e) => {
          e.preventDefault();
          scrollToFooter('contact');
        }}>Contact us</a>
      </div>
    </nav>
  );
}

export default Navbar;