import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import Forgot from './components/Forgot Password/Forgot';
import Education from './Pages/EducationPage/Education';
import Courses from './Pages/Courses/Courses';
import Dashboard from './Pages/Dashboard/Dashboard';
import Store from './Pages/Store/Store';
import SettingsSidebar from './components/SettingsSidebar/SettingsSidebar';
import ProfileSettings from './Pages/ProfileSettings/ProfileSettings';
import SecurityPage from './Pages/SecurityPage.jsx/SecurityPage';
import PaymentSettings from './Pages/PaymentSettings/PaymentSettings'; 
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/Login" element={<LoginPage />} /> 
      <Route path="/Signup" element={<SignupPage/>} />
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      <Route path="/Education" element={
        <ProtectedRoute>
        <Education />
      </ProtectedRoute>
        }/>
      <Route path="/courses" element={
        <ProtectedRoute>
        <Courses />
      </ProtectedRoute>}/>
      <Route path="/Store" element={<Store/>}/>
      <Route path="/Settings" element={<SettingsSidebar/>}/>
      <Route path="/settings/profile" element={<ProfileSettings/>}/>
      <Route path="/settings/security" element={<SecurityPage />}/>
      <Route path="/settings/change-password" element={<SecurityPage activeSection="password" />}/>
      <Route path="/settings/notification-settings" element={<SecurityPage activeSection="notifications" />}/>
      <Route path="/settings/login-methods" element={<SecurityPage activeSection="login" />}/>
      {/* Add the new payment settings route */}
      <Route path="/settings/payment" element={<PaymentSettings />}/>
      <Route path="/reset-password" element={<Forgot/>}/>
    </Routes>
  )
}

export default App