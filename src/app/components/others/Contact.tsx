"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import the usePathname hook
import { useOther } from '../../context/OtherContext';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';
import styles from './styles/Contact.module.css';

const Contact: React.FC = () => {
  const pathname = usePathname(); // Get the current path
  const { selectedMoreItem } = useOther();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string | null>(null);

  const handleIconClick = (info: string) => {
    if (info === 'email') {
      setDialogContent(`Email: ${selectedMoreItem?.email}`);
      setDialogOpen(true);
    } else if (info === 'phone') {
      setDialogContent(`Phone: ${selectedMoreItem?.phone}`);
      setDialogOpen(true);
    } else if (info === 'github' && selectedMoreItem?.github) {
      const githubUrl = selectedMoreItem.github.startsWith('http')
        ? selectedMoreItem.github
        : `https://github.com/${selectedMoreItem.github}`;
      window.open(githubUrl, '_blank');
    } else if (info === 'linkedin' && selectedMoreItem?.linkedin) {
      const linkedinUrl = selectedMoreItem.linkedin.startsWith('http')
        ? selectedMoreItem.linkedin
        : `https://linkedin.com/in/${selectedMoreItem.linkedin}`;
      window.open(linkedinUrl, '_blank');
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogContent(null);
  };

  if (pathname === '/') {
    return null; // Do not render anything if on the '/' route
  }

  if (!selectedMoreItem) {
    return <p className={styles.noSelection}>No Contact Information selected.</p>;
  }

  return (
    <div className={styles.contactContainer}>
      <div className={styles.iconMenu}>
        <FaEnvelope className={styles.icon} onClick={() => handleIconClick('email')} />
        <FaPhone className={styles.icon} onClick={() => handleIconClick('phone')} />
        <FaGithub className={styles.icon} onClick={() => handleIconClick('github')} />
        <FaLinkedin className={styles.icon} onClick={() => handleIconClick('linkedin')} />
      </div>

      {dialogOpen && (
        <div className={styles.dialogOverlay} onClick={closeDialog}>
          <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
            <FaTimes className={styles.closeIcon} onClick={closeDialog} />
            <p>{dialogContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
