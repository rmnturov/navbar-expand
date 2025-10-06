import React from 'react';
import { useLocation } from 'react-router-dom';
import KoobiqIcon from './KoobiqIcon';
import './Topbar.css';

const Topbar = () => {
  const location = useLocation();
  const currentSidebar = location.pathname === '/new' ? 'Сайдбар 2' : 'Сайдбар 1';
  
  return (
    <header className="topbar">
      <div className="topbar-content">
        {/* Left section - Title */}
        <div className="topbar-left">
          <div className="topbar-title">{currentSidebar}
            <span className="page-title-counter">192</span>
          </div>
        </div>

        {/* Right section - Actions and User */}
        <div className="topbar-right">
          <div className="topbar-button">
            <KoobiqIcon name="plus" size={16} /> Button
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
