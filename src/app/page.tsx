'use client';

import React from 'react';
import { FaUserTie, FaUser, FaArrowLeft, FaUserAlt, FaLock } from 'react-icons/fa';
import styles from './login.module.css';
import { useLogin } from './context/LoginContext';

const Login = () => {
  const {
    identity,
    handleIdentityClick,
    handleBackClick,
    handleChange,
    handleSubmit,
    admin,
    message,
  } = useLogin();

  return (
    <div className={styles.container}>
      <div className={`${styles.loginPanel} ${identity ? styles.expanded : ''}`}>
        {identity === null || identity === 'Tour' ? (
          <div className={styles.identityOptions}>
            <div className={styles.identity} onClick={() => handleIdentityClick('Tour')}>
              <FaUser className={styles.icon} />
              <span>Tour</span>
            </div>
            <div className={styles.identity} onClick={() => handleIdentityClick('Admin')}>
              <FaUserTie className={styles.icon} />
              <span>Admin</span>
            </div>
          </div>
        ) : (
          <>
            <FaArrowLeft className={styles.backIcon} onClick={handleBackClick} />
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>{identity} Login</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <FaUserAlt className={styles.inputIcon} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={styles.input}
                    value={admin.username}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={styles.input}
                    value={admin.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className={styles.button}>
                  Login
                </button>
              </form>
              {message && <p className={styles.message}>{message}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
