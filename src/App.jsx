import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import Forgot from './components/Forgot Password/Forgot';

const App = () => {
  return (
    <Routes>
  <Route path="/" element={<LandingPage />} /> 
  <Route path="/Login" element={<LoginPage />} /> 
  <Route path="/Signup" element={<SignupPage/>} />
  <Route path= "/reset-password" element={<Forgot/>}/>
    </Routes>
  )
}

export default App