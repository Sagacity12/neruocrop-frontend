import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, Leaf, Cog, MonitorSmartphone, Star, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Courses.css';

function Courses() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for changes in sidebar state - same as in Education component
  useEffect(() => {
    const handleSidebarChange = () => {
      const mainWrapper = document.querySelector('.main-wrapper');
      setSidebarCollapsed(mainWrapper?.classList.contains('sidebar-collapsed'));
    };

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

  // Scroll to section based on hash fragment
  useEffect(() => {
    // Get the hash fragment from the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the # character
      const id = hash.substring(1);
      // Find the element with the matching ID
      const element = document.getElementById(id);
      // If element exists, scroll to it
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar />
        <main className="main-content">
          <div className="courses-header">
            <h1>Agricultural Courses</h1>
            <p>Explore our comprehensive collection of courses designed to enhance your agricultural knowledge and skills.</p>
            
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for courses"
                className="search-input"
              />
              <button className="search-button">
                Search
              </button>
            </div>
          </div>

          {/* Organic Farming Section */}
          <section id="organic-farming" className="learning-module">
            <div className="module-header">
              <div className="module-icon-wrapper">
                <Leaf className="module-icon" />
              </div>
              <div>
                <h2 className="module-heading">Organic Farming</h2>
                <p className="module-summary">Learn sustainable farming practices without synthetic inputs</p>
              </div>
            </div>

            <div className="module-grid">
              {[
                {
                  title: "Introduction to Organic Farming",
                  description: "Learn the fundamentals of organic agriculture and sustainable farming practices.",
                  duration: "6 weeks",
                  students: "1.8k students",
                  rating: 4.8
                },
                {
                  title: "Soil Health Management",
                  description: "Master techniques for building and maintaining healthy soil in organic systems.",
                  duration: "8 weeks",
                  students: "1.5k students",
                  rating: 4.7
                },
                {
                  title: "Organic Pest Control",
                  description: "Natural and biological methods to manage pests in organic crop production.",
                  duration: "4 weeks",
                  students: "2.1k students",
                  rating: 4.9
                },
                {
                  title: "Organic Certification Process",
                  description: "Navigate the requirements and steps to achieve organic certification for your farm.",
                  duration: "3 weeks",
                  students: "950 students",
                  rating: 4.6
                },
              ].map((course, index) => (
                <div key={index} className="module-item">
                  <div className="module-thumbnail" style={{ backgroundColor: '#e0f2e9', height: '150px' }}></div>
                  <div className="module-content">
                    <h3 className="module-title">{course.title}</h3>
                    <p className="module-description">{course.description}</p>
                    <div className="module-metadata">
                      <div className="module-rating">
                        <Star className="meta-icon" size={16} />
                        <span>{course.rating}</span>
                      </div>
                      <div className="module-duration">
                        <Clock className="meta-icon" size={16} />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="module-enrollment">{course.students}</div>
                    <button className="module-cta">Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Agriculture Economics Section */}
          <section id="agriculture-economics" className="learning-module">
            <div className="module-header">
              <div className="module-icon-wrapper">
                <Cog className="module-icon" />
              </div>
              <div>
                <h2 className="module-heading">Agriculture Economics</h2>
                <p className="module-summary">Master the business and financial aspects of agricultural enterprises</p>
              </div>
            </div>

            <div className="module-grid">
              {[
                {
                  title: "Farm Business Management",
                  description: "Learn how to run a profitable and sustainable agricultural business.",
                  duration: "10 weeks",
                  students: "1.2k students",
                  rating: 4.6
                },
                {
                  title: "Agricultural Market Analysis",
                  description: "Analyze market trends and develop strategies for agricultural products.",
                  duration: "6 weeks",
                  students: "950 students",
                  rating: 4.5
                },
                {
                  title: "Farm Financial Planning",
                  description: "Build comprehensive financial plans for farm operations of any size.",
                  duration: "8 weeks",
                  students: "1.1k students",
                  rating: 4.7
                },
                {
                  title: "Agricultural Policy & Subsidies",
                  description: "Navigate government policies, subsidies, and programs for farmers.",
                  duration: "5 weeks",
                  students: "780 students",
                  rating: 4.4
                },
              ].map((course, index) => (
                <div key={index} className="module-item">
                  <div className="module-thumbnail" style={{ backgroundColor: '#e8f0f2', height: '150px' }}></div>
                  <div className="module-content">
                    <h3 className="module-title">{course.title}</h3>
                    <p className="module-description">{course.description}</p>
                    <div className="module-metadata">
                      <div className="module-rating">
                        <Star className="meta-icon" size={16} />
                        <span>{course.rating}</span>
                      </div>
                      <div className="module-duration">
                        <Clock className="meta-icon" size={16} />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="module-enrollment">{course.students}</div>
                    <button className="module-cta">Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Agricultural Digital Technology Section */}
          <section id="digital-technology" className="learning-module">
            <div className="module-header">
              <div className="module-icon-wrapper">
                <MonitorSmartphone className="module-icon" />
              </div>
              <div>
                <h2 className="module-heading">Agricultural Digital Technology</h2>
                <p className="module-summary">Leverage modern technology to improve farming efficiency and productivity</p>
              </div>
            </div>

            <div className="module-grid">
              {[
                {
                  title: "Precision Agriculture Fundamentals",
                  description: "Learn how to use GPS, sensors, and mapping to optimize farm operations.",
                  duration: "7 weeks",
                  students: "2.3k students",
                  rating: 4.9
                },
                {
                  title: "Farm Drones & Remote Sensing",
                  description: "Master the use of drones for crop monitoring, mapping, and spraying.",
                  duration: "6 weeks",
                  students: "1.9k students",
                  rating: 4.8
                },
                {
                  title: "Smart Irrigation Systems",
                  description: "Implement water-efficient irrigation using IoT sensors and automation.",
                  duration: "5 weeks",
                  students: "1.5k students",
                  rating: 4.7
                },
                {
                  title: "Farm Management Software",
                  description: "Digitize record-keeping and operations management with modern software tools.",
                  duration: "4 weeks",
                  students: "1.7k students",
                  rating: 4.6
                },
              ].map((course, index) => (
                <div key={index} className="module-item">
                  <div className="module-thumbnail" style={{ backgroundColor: '#e8ecf7', height: '150px' }}></div>
                  <div className="module-content">
                    <h3 className="module-title">{course.title}</h3>
                    <p className="module-description">{course.description}</p>
                    <div className="module-metadata">
                      <div className="module-rating">
                        <Star className="meta-icon" size={16} />
                        <span>{course.rating}</span>
                      </div>
                      <div className="module-duration">
                        <Clock className="meta-icon" size={16} />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="module-enrollment">{course.students}</div>
                    <button className="module-cta">Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Animal Care Skills Section */}
          <section id="animal-care" className="learning-module">
            <div className="module-header">
              <div className="module-icon-wrapper">
                <Cog className="module-icon" />
              </div>
              <div>
                <h2 className="module-heading">Animal Care Skills</h2>
                <p className="module-summary">Develop expertise in livestock management and animal husbandry</p>
              </div>
            </div>

            <div className="module-grid">
              {[
                {
                  title: "Sustainable Livestock Management",
                  description: "Practice ethical and sustainable approaches to raising livestock.",
                  duration: "9 weeks",
                  students: "1.4k students",
                  rating: 4.7
                },
                {
                  title: "Poultry Production & Health",
                  description: "Learn commercial and small-scale poultry production techniques.",
                  duration: "6 weeks",
                  students: "1.2k students",
                  rating: 4.6
                },
                {
                  title: "Dairy Management Systems",
                  description: "Master the art and science of dairy farm management and milk production.",
                  duration: "8 weeks",
                  students: "950 students",
                  rating: 4.5
                },
                {
                  title: "Animal Health & Disease Prevention",
                  description: "Identify, prevent, and manage common livestock health issues.",
                  duration: "7 weeks",
                  students: "1.3k students",
                  rating: 4.8
                },
              ].map((course, index) => (
                <div key={index} className="module-item">
                  <div className="module-thumbnail" style={{ backgroundColor: '#f7ecec', height: '150px' }}></div>
                  <div className="module-content">
                    <h3 className="module-title">{course.title}</h3>
                    <p className="module-description">{course.description}</p>
                    <div className="module-metadata">
                      <div className="module-rating">
                        <Star className="meta-icon" size={16} />
                        <span>{course.rating}</span>
                      </div>
                      <div className="module-duration">
                        <Clock className="meta-icon" size={16} />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="module-enrollment">{course.students}</div>
                    <button className="module-cta">Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Courses;