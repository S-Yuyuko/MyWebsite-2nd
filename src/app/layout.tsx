"use client"; // Add this line to make the component a client component

import React from 'react';
import NavBar from './components/navbar/NavBar';
import Contact from './components/others/Contact';
import AppProviders from './components/AppProviders';
import './globals.css';
import usePreventRefresh from '../hooks/usePreventRefresh';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Apply the refresh prevention hook globally
  usePreventRefresh();

  return (
    <html lang="en">
      <body className="layout">
        <AppProviders>
          <NavBar />
          <main className="main-content">{children}</main>
          <Contact />
        </AppProviders>
      </body>
    </html>
  );
};

export default Layout;
