// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';  // Import the FileUpload component
import profile_img from '../styles/icons/Profile.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false); // Add a state to track whether to show the profile card
  const [userName, setUserName] = useState(''); // Add a state to store the username

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const userName = email.substring(0, email.indexOf('@')); // Extract the username from the email
      setUserName(userName); // Update the username state
    }
  }, [auth]);

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

  const handleProfileIconHover = () => {
    setShowProfileCard(true);
  };

  const handleProfileIconLeave = () => {
    setShowProfileCard(false);
  };

  return (
    <div className="dashboard-container">
      <header className="header-container">
        <div className="header-left">chatwithwebsite</div>
        <div className="header-right">
          <ul>
            <li>{userName}</li>
          </ul>
          <img
            className='profile_img'
            src={profile_img}
            onMouseEnter={handleProfileIconHover}
            onMouseLeave={handleProfileIconLeave}
          ></img>
          {showProfileCard && (
            <div className="profile-card">
              <h2>{userName}</h2> // Display the username
              <p>{'anish.nagula@gmail.com'}</p>
              <p className='credit'>Credits left: {15}</p>
            </div>
          )}
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
            <li>About</li>
            <li onClick={handleLogout}>Logout</li>
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