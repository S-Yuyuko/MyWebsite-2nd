'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { routes } from '../../../navigation/routes';
import { useNavBar } from '../../context/NavBarContext';
import ThemeToggle from '../ThemeToggle';
import { FaUserTie, FaUser } from 'react-icons/fa';
import styles from './styles/NavBar.module.css';
import ContentInfo from './ContentInfo'; // Import ContentInfo component

const NavBar = () => {
  const {
    isMenuOpen,
    toggleMenu,
    handleLogout,
    openDialog,
    identity,
    pathname,
  } = useNavBar();

  const [isContentInfoOpen, setContentInfoOpen] = useState(false);

  const handleContentInfoOpen = () => {
    if (identity === 'Admin') {
      setContentInfoOpen(true);
    }
  };

  const handleContentInfoClose = () => {
    setContentInfoOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.navContainer}>
        {pathname !== '/' && (
          <>
            <div className={styles.identityContainer} onClick={toggleMenu}>
              {identity === 'Admin' ? (
                <FaUserTie className={styles.identityIcon} />
              ) : identity === 'Tour' ? (
                <FaUser className={styles.identityIcon} />
              ) : null}
              {isMenuOpen && (
                <div className={styles.subMenu}>
                  {identity === 'Admin' && (
                    <>
                      <button className={styles.subMenuItem} onClick={openDialog}>
                        View Admins
                      </button>
                      <button className={styles.subMenuItem} onClick={handleContentInfoOpen}>
                        Content Info
                      </button>
                    </>
                  )}
                  <button className={styles.subMenuItem} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
            <ul className={styles.navList}>
              {routes.filter(route => route.name !== 'Login').map((route, index) => (
                <li key={index} className={styles.navItem}>
                  <Link href={route.path} className={styles.navLink}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className={styles.toggleContainer}>
          <ThemeToggle />
        </div>
      </nav>
      {identity === 'Admin' && (
        <ContentInfo isOpen={isContentInfoOpen} onClose={handleContentInfoClose} />
      )}
    </header>
  );
};

export default NavBar;
