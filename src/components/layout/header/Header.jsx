import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useUI } from '../../../hooks/useUI';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css';

const Header = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const { toggleSidebar, viewMode, toggleViewMode } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        
        <h1 className="header-logo">
          <span className="logo-text">DAM</span>
        </h1>
      </div>

      <div className="header-center">
        <form onSubmit={handleSearch} className="search-form">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </div>

      <div className="header-right">
        <button className="view-toggle" onClick={toggleViewMode} title="Toggle view">
          {viewMode === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
        </button>

        <div className="user-menu-wrapper">
          <button
            className="user-menu-trigger"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <AccountCircleIcon />
            <span className="user-name">{user?.name}</span>
          </button>

          {showUserMenu && (
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <p className="user-menu-name">{user?.name}</p>
                <p className="user-menu-email">{user?.email}</p>
                <span className={`user-role-badge role-${user?.role}`}>
                  {user?.role}
                </span>
              </div>
              
              <button className="user-menu-item" onClick={logout}>
                <LogoutIcon />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;