// src/components/Dashboard.js
import React from 'react';
import { auth } from '../firebase';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';  // Import the FileUpload component

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
    // Add your file processing or AI integration logic here
  };

  return (
    <div className="dashboard-container">
      <header className="header-container">
        <div className="header-left">chatwithwebsite</div>
        <div className="header-right">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Help</li>
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="sidebar">
          <ul className="top-links">
            <li>New Chat</li>
            <li>History</li>
          </ul>
          <div style={{ flexGrow: 1 }}></div>
          <ul className="bottom-links">
            <li>Settings</li>
            <li>Your Profile</li>
          </ul>
        </div>
        <div className="main-content">
          <div></div>
          <div className="search-bar-container">
            <div className="search-bar-wrapper">
              {/* FileUpload button here */}
              <FileUpload onFileUpload={handleFileUpload} />
              <input type="text" placeholder="Search..." className="search-bar" />
              <button className="search-button">
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
