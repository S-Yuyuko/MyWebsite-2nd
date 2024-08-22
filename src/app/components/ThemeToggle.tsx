
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './styles/ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className={styles.slider}>
        <FaMoon className={`${styles.icon} ${styles.moon}`} />
        <FaSun className={`${styles.icon} ${styles.sun}`} />
      </span>
    </label>
  );
};

export default ThemeToggle;
