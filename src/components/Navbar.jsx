import React, { useState } from 'react';
import { BsBell, BsCheckCircle, BsEnvelope, BsPersonCircle } from 'react-icons/bs';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-right">
          <div className="notification-container">
            <BsBell 
              className="notification-icon"
              onClick={toggleNotifications}
            />
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3 className="notification-title">Notifications</h3>
                  <div className="notification-list">
                    <div className="notification-item">
                      <BsEnvelope className="notification-item-icon message" />
                      <div>
                        <p className="notification-text">New message received</p>
                        <span className="notification-time">2 minutes ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <BsCheckCircle className="notification-item-icon success" />
                      <div>
                        <p className="notification-text">System update completed</p>
                        <span className="notification-time">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="user-container">
            <div onClick={toggleUserMenu} className="user-icon-container">
              <BsPersonCircle className="user-icon" />
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <BsPersonCircle className="user-icon" />
                  <p>John Doe</p>
                  <p className="user-email">john.doe@example.com</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
