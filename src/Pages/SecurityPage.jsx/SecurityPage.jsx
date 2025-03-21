import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Bell, Layers, ArrowLeft, Shield } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './SecurityPage.css';

function SecurityPrivacyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('password');
  
  // Determine which section to show based on URL or state
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('change-password')) {
      setActiveSection('password');
    } else if (path.includes('notification-settings')) {
      setActiveSection('notifications');
    } else if (path.includes('login-methods')) {
      setActiveSection('login');
    }
  }, [location.pathname]);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    securityAlerts: true
  });
  
  // Login methods state
  const [loginMethods, setLoginMethods] = useState({
    password: true,
    google: false,
    facebook: false,
    twoFactorAuth: false
  });
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };
  
  const handleLoginMethodChange = (e) => {
    const { name, checked } = e.target;
    setLoginMethods({
      ...loginMethods,
      [name]: checked
    });
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    
    // Success simulation
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const toggleTwoFactor = () => {
    // In real implementation, this would involve more steps
    setLoginMethods({
      ...loginMethods,
      twoFactorAuth: !loginMethods.twoFactorAuth
    });
    
    if (!loginMethods.twoFactorAuth) {
      alert('Two-factor authentication has been enabled!');
    } else {
      alert('Two-factor authentication has been disabled.');
    }
  };
  
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="security-privacy-container">
        <div className="security-header">
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            <span></span>
          </button>
          <h1><Shield className="security-icon" /> Security and Privacy</h1>
          <p className="subtitle">Manage your account security settings</p>
        </div>
        
        <div className="security-nav">
          <div 
            className={`security-nav-item ${activeSection === 'password' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('password');
              navigate('/settings/change-password');
            }}
          >
            <Lock size={18} />
            <span>Change Password</span>
          </div>
          <div 
            className={`security-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('notifications');
              navigate('/settings/notification-settings');
            }}
          >
            <Bell size={18} />
            <span>Notification Settings</span>
          </div>
          <div 
            className={`security-nav-item ${activeSection === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('login');
              navigate('/settings/login-methods');
            }}
          >
            <Layers size={18} />
            <span>Login Methods</span>
          </div>
        </div>
        
        <div className="security-content">
          {activeSection === 'password' && (
            <div className="security-section">
              <h2>Change Password</h2>
              <p>Create a strong password to secure your account.</p>
              
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <small>Use at least 8 characters with a mix of letters, numbers, and symbols.</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                
                <button type="submit" className="primary-button">Update Password</button>
              </form>
            </div>
          )}
          
          {activeSection === 'notifications' && (
            <div className="security-section">
              <h2>Notification Settings</h2>
              <p>Manage how you receive notifications from us.</p>
              
              <div className="notification-settings">
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>Email Notifications</h3>
                    <p>Receive important updates and alerts via email.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>SMS Notifications</h3>
                    <p>Receive important updates and alerts via text message.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>Marketing Emails</h3>
                    <p>Receive news about new features, products, and promotions.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>Security Alerts</h3>
                    <p>Receive notifications about suspicious activities and security updates.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="securityAlerts"
                      checked={notificationSettings.securityAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <button className="primary-button">Save Notification Settings</button>
              </div>
            </div>
          )}
          
          {activeSection === 'login' && (
            <div className="security-section">
              <h2>Login Methods</h2>
              <p>Manage how you sign in to your account.</p>
              
              <div className="login-methods">
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>Password Login</h3>
                    <p>Use your email and password to sign in.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="password"
                      checked={loginMethods.password}
                      onChange={handleLoginMethodChange}
                      disabled={true} // At least one login method should be enabled
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>Google Login</h3>
                    <p>Sign in with your Google account.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="google"
                      checked={loginMethods.google}
                      onChange={handleLoginMethodChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="setting-option">
                  <div className="setting-info">
                    <h3>Facebook Login</h3>
                    <p>Sign in with your Facebook account.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="facebook"
                      checked={loginMethods.facebook}
                      onChange={handleLoginMethodChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="setting-option two-factor">
                  <div className="setting-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account by requiring a verification code when you sign in.</p>
                  </div>
                  <button 
                    className={`two-factor-button ${loginMethods.twoFactorAuth ? 'enabled' : 'disabled'}`}
                    onClick={toggleTwoFactor}
                  >
                    {loginMethods.twoFactorAuth ? 'Disable' : 'Enable'}
                  </button>
                </div>
                
                <button className="primary-button">Save Login Methods</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecurityPrivacyPage;