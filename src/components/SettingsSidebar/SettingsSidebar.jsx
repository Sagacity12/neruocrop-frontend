import React, { useState } from 'react';
import { X, User, Shield, History, CreditCard, Tag, Lock, Bell, Layers, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SettingsSidebar.css';

function SettingsSidebar({ isOpen, onClose, onLogout }) {
  // Add state for controlling the logout confirmation popup
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    // Show the confirmation popup instead of logging out immediately
    setShowLogoutConfirm(true);
  };
  
  const confirmLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setShowLogoutConfirm(false);
  };
  
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <aside className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="settings-sidebar-content">
          <div className="settings-header">
            <div className="settings-title">
              <Shield className="settings-icon" />
              <h2>Settings</h2>
            </div>
            <button 
              className="close-settings" 
              onClick={onClose}
              aria-label="Close settings"
            >
              <X size={20} />
            </button>
          </div>

          <div className="settings-section">
            <h3>Payment</h3>
            <nav className="settings-nav">
              
              <Link to="/settings/payment#order-history" className="settings-nav-link">
                <History className="settings-nav-icon" />
                <span>Order History</span>
              </Link>
              <Link to="/settings/payment#payment-method" className="settings-nav-link">
                <CreditCard className="settings-nav-icon" />
                <span>Payment Method</span>
              </Link>
              <Link to="/settings/payment#redeem" className="settings-nav-link">
                <Tag className="settings-nav-icon" />
                <span>Redeem</span>
              </Link>
            </nav>
          </div>

          <div className="settings-section">
            <h3>Security and Privacy</h3>
            <nav className="settings-nav">
              <Link to="/settings/change-password" className="settings-nav-link">
                <Lock className="settings-nav-icon" />
                <span>Change Password</span>
              </Link>
              <Link to="/settings/notification-settings" className="settings-nav-link">
                <Bell className="settings-nav-icon" />
                <span>Notification settings</span>
              </Link>
              <Link to="/settings/login-methods" className="settings-nav-link">
                <Layers className="settings-nav-icon" />
                <span>Login Methods</span>
              </Link>
            </nav>
          </div>
          
          <div className="settings-section profile-section">
            <nav className="settings-nav">
              <Link to="/settings/profile" className="settings-nav-link">
                <User className="settings-nav-icon" />
                <span>Profile</span>
              </Link>
              <a
                href="#logout"
                className="settings-nav-link logout-link"
                onClick={handleLogoutClick}
              >
                <LogOut className="settings-nav-icon" />
                <span>Log out</span>
              </a>
            </nav>
          </div>
        </div>
      </aside>
      
      {/* Logout confirmation popup */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-popup">
            <h3>Confirm Log out</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-confirm-buttons">
              <button 
                className="logout-cancel-btn" 
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button 
                className="logout-confirm-btn" 
                onClick={confirmLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsSidebar;