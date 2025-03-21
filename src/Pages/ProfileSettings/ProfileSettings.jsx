import React, { useState } from 'react';
import { User, Bell, Camera, Save, X } from 'lucide-react';
import "./ProfileSettings.css";
import Sidebar from '../../components/Sidebar/Sidebar'; // Adjust the path as needed

function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    name: 'AgricSmart',
    email: 'group25@agricsmart.com',
    phone: '+233 50 427 8893',
    bio: 'A farmer.',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...profileData});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (like notifications.email)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // Handle top-level fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({...profileData});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send data to your backend
    setProfileData({...formData});
    setIsEditing(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <div className="payment-settings-container">
          <h1>Profile Settings</h1>
          
          {saveSuccess && (
            <div className="success-message">
              Profile updated successfully!
            </div>
          )}

          <div className="payment-section" id="personal-info">
            <div className="section-header">
              <User className="section-icon" />
              <h2>Personal Information</h2>
            </div>
            <div className="section-content">
              <div className="profile-content">
                <form onSubmit={handleSubmit}>
                  <div className="profile-avatar-section">
                    <div className="avatar-container">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Profile preview" className="profile-avatar" />
                      ) : (
                        <div className="profile-avatar">
                          {profileData.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      
                      {isEditing && (
                        <div className="avatar-upload">
                          <label htmlFor="avatar-input" className="avatar-upload-label">
                            <Camera size={20} />
                            <span>Change</span>
                          </label>
                          <input 
                            id="avatar-input"
                            type="file" 
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="avatar-input"
                          />
                        </div>
                      )}
                    </div>
                    
                    {!isEditing && (
                      <button 
                        type="button" 
                        className="add-payment-btn" // Changed to match PaymentSettings style
                        onClick={handleEdit}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="payment-form" style={{ display: isEditing ? 'block' : 'none' }}> {/* Using payment-form class to match style */}
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control" // Added for PaymentSettings style
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control" // Added for PaymentSettings style
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control" // Added for PaymentSettings style
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="form-control" // Added for PaymentSettings style
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                      />
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="submit-payment-btn" // Changed to match PaymentSettings style
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Display mode (non-editing) */}
                  {!isEditing && (
                    <div className="profile-info-display">
                      <div className="order-history-table">
                        <table>
                          <tbody>
                            <tr>
                              <th>Full Name</th>
                              <td>{profileData.name}</td>
                            </tr>
                            <tr>
                              <th>Email Address</th>
                              <td>{profileData.email}</td>
                            </tr>
                            <tr>
                              <th>Phone Number</th>
                              <td>{profileData.phone}</td>
                            </tr>
                            <tr>
                              <th>Bio</th>
                              <td>{profileData.bio}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="payment-section" id="notification-preferences">
            <div className="section-header">
              <Bell className="section-icon" />
              <h2>Notification Preferences</h2>
            </div>
            <div className="section-content">
              <form>
                <div className="payment-form" style={{ maxWidth: '500px' }}>
                  <div className="checkbox-group form-group">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      name="notifications.email"
                      checked={isEditing ? formData.notifications.email : profileData.notifications.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <label htmlFor="email-notifications">Email Notifications</label>
                  </div>

                  <div className="checkbox-group form-group">
                    <input
                      type="checkbox"
                      id="push-notifications"
                      name="notifications.push"
                      checked={isEditing ? formData.notifications.push : profileData.notifications.push}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <label htmlFor="push-notifications">Push Notifications</label>
                  </div>

                  <div className="checkbox-group form-group">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      name="notifications.sms"
                      checked={isEditing ? formData.notifications.sms : profileData.notifications.sms}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <label htmlFor="sms-notifications">SMS Notifications</label>
                  </div>

                  {!isEditing && (
                    <button 
                      type="button" 
                      className="add-payment-btn" // Changed to match PaymentSettings style
                      onClick={handleEdit}
                    >
                      Edit Preferences
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;