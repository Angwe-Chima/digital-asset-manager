import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children, onSearch, onFilterChange }) => {
  return (
    <div className="layout">
      <Header onSearch={onSearch} />
      <div className="layout-body">
        <Sidebar onFilterChange={onFilterChange} />
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;