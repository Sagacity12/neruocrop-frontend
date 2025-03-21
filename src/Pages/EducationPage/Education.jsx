import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, Leaf, Cog, MonitorSmartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Education.css';

function Education() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Listen for changes in sidebar state
  useEffect(() => {
    const handleSidebarChange = () => {
      const mainWrapper = document.querySelector('.main-wrapper');
      setSidebarCollapsed(mainWrapper?.classList.contains('sidebar-collapsed'));
    };

    // Use MutationObserver to detect class changes
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
      const observer = new MutationObserver(handleSidebarChange);
      observer.observe(mainWrapper, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);

  // Update navbar class when sidebar state changes
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (sidebarCollapsed) {
        navbar.classList.add('sidebar-collapsed');
      } else {
        navbar.classList.remove('sidebar-collapsed');
      }
    }
  }, [sidebarCollapsed]);

  // Handler for navigation to courses page
  const handleNavigateToCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar />
        <main className="main-content">
          <div 
            className="hero-section"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1920")',
            }}
          >
            <div className="hero-overlay">
              <div className="hero-content">
                <h1 className="hero-title">
                  Learn New Skills & Earn Certifications
                </h1>
                <p className="hero-subtitle">
                  Learn anything relating to farming with technology
                </p>
                
                <div className="search-container">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="What do you want to learn"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-button">
                    Search
                  </button>
                </div>

                <div className="popular-searches">
                  <p className="popular-searches-title">People search for</p>
                  <div className="search-tags">
                    {['Soil Health', 'Agric Food System', 'Permaculture'].map((item) => (
                      <button
                        key={item}
                        className="search-tag"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cta-buttons">
                  <button 
                    className="cta-primary"
                    onClick={handleNavigateToCourses}
                  >
                    Start learning Now
                  </button> 
                  <button 
                    className="cta-secondary"
                    onClick={handleNavigateToCourses}
                  >
                    Explore Courses →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-icon-container">
                <BookOpen className="stat-icon" />
              </div>
              <div>
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Total Courses</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <Users className="stat-icon" />
              </div>
              <div>
                <h3 className="stat-number">1000+</h3>
                <p className="stat-label">Students Globally</p>
              </div>
            </div>
          </div>

          <div className="career-section">
            <h2 className="career-title">Explore Your Career Fit</h2>
            <p className="career-description">
              Grab the opportunity today and get all recommended mentorship programs and videos designed to improve your knowledge in agriculture
            </p>
            <div className="career-grid">
              {[
                { icon: Leaf, title: 'Organic Farming', courses: '15000+ courses available', link: '/courses#organic-farming' },
                { icon: Cog, title: 'Agriculture Economics', courses: '15000+ courses available', link: '/courses#agriculture-economics' },
                { icon: MonitorSmartphone, title: 'Agricultural Digital Technology', courses: '15000+ courses available', link: '/courses#digital-technology' },
                { icon: Cog, title: 'Animal Care Skills', courses: '15000+ courses available', link: '/courses#animal-care' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="career-card" 
                  onClick={() => window.location.href = item.link}
                >
                  <div className="career-icon-container">
                    <item.icon className="career-card-icon" />
                  </div>
                  <div className="career-card-content">
                    <h3 className="career-card-title">{item.title}</h3>
                    <p className="career-card-courses">{item.courses}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Education;