import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Store, Settings } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';
import SettingsSidebar from '../../components/SettingsSidebar/SettingsSidebar';
import logo34white from "../../assets/logo34white.png";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [settingsSidebarOpen, setSettingsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    
    // Update main wrapper margin when sidebar collapses/expands
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
      if (!collapsed) { // Will collapse
        mainWrapper.classList.add('sidebar-collapsed');
      } else { // Will expand
        mainWrapper.classList.remove('sidebar-collapsed');
      }
    }
    
    // Update navbar class when sidebar state changes
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (!collapsed) { // Will collapse
        navbar.classList.add('sidebar-collapsed');
      } else { // Will expand
        navbar.classList.remove('sidebar-collapsed');
      }
    }
  };

  const toggleSettingsSidebar = (e) => {
    // Only if the settings link is clicked
    if (e) {
      e.preventDefault();
    }
    setSettingsSidebarOpen(!settingsSidebarOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    
    // Example: clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    // Close settings sidebar
    setSettingsSidebarOpen(false);
    
    // Redirect to login page
    navigate("/login");
  };

  // Define navigation items with their routes
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/Dashboard' },
    { icon: GraduationCap, label: 'Education', path: '/education' },
    { icon: Store, label: 'Store', path: '/store' },
  ];

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path.includes('/settings') && location.pathname.includes('/settings'));
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-content">
        <button 
  className="sidebar-toggle"
  onClick={toggleSidebar}
  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
>
  {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
</button >
          
          <div className="logo-container">
            <img src={logo34white} alt="AgricSmart Logo" className="custom-logo" />
            <span className="logo-text">AgricSmart</span>
          </div>

          <nav>
            {/* Regular navigation items */}
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''} ${hoveredItem === item.label ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/*  handling for Settings to open secondary sidebar */}
            <a
              href="#settings"
              onClick={toggleSettingsSidebar}
              className={`nav-link ${isActive('/settings') ? 'active' : ''} ${hoveredItem === 'Settings' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem('Settings')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Settings className="nav-icon" />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>
      
      {/* Settings Sidebar */}
      <SettingsSidebar 
        isOpen={settingsSidebarOpen} 
        onClose={() => setSettingsSidebarOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default Sidebar;