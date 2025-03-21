import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Dashboard.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FloatingChatButton from '../../components/FloatingChatButton/FloatingChatButton';

const Dashboard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const images = [
    {
      url: "src/assets/drone.jpg",
      title: "Revolutionizing Agriculture with Agricultural Drones:",
      description: "Farming drones are transforming how farmers manage their crops and resources becoming an essential tool in precision agriculture"
    },
    {
      url: "src/assets/smart robot.jpg",
      title: "Smart Farming Technologies:",
      description: "Advanced sensors and IoT devices help farmers monitor crop health, soil conditions, and weather patterns in real-time"
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661815665885-a7d418cf24a4?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Automated Farming Systems:",
      description: "Robotic systems and AI-powered machinery are revolutionizing traditional farming methods for increased efficiency"
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661903177023-2dfa863d1d6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Precision Agriculture Solutions:",
      description: "Data-driven farming techniques optimize resource usage and maximize crop yields through targeted interventions"
    }
  ];

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <main className="dashboard-main">
          <header className="dashboard-header">
            <div className="header-content">
              <h1>{images[currentImageIndex].title}</h1>
              <p>{images[currentImageIndex].description}</p>
            </div>
            
            <div className="slider-container">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.title}
                  className="slider-image"
                  style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                />
              ))}
              <div className="navigation-buttons">
                <button className="nav-button" onClick={previousImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="nav-button" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div className="tagline">
              Connecting the world's Greatest Companies to their customers
            </div>
          </header>
        </main>
        <Footer />
      </div>
      
      {/* Floating Chat Button Component */}
      <FloatingChatButton />
    </div>
  );
};

export default Dashboard;