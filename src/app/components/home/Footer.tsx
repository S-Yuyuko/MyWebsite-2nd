'use client';

import React from 'react';
import Link from 'next/link';
import { FaBriefcase, FaInfoCircle } from 'react-icons/fa';
import styles from './styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footerContainer}>
      <h2 className={styles.title}>Want to know more?</h2>
      <div className={styles.content}>
        <Link href="/experience" className={styles.link}>
          <FaBriefcase className={styles.icon} />
          Experience
        </Link>
        <Link href="/about" className={styles.link}>
          <FaInfoCircle className={styles.icon} />
          About
        </Link>
      </div>
    </div>
  );
};

export default Footer;
