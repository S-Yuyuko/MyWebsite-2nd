'use client';

import React, { useContext } from 'react';
import {
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaInfoCircle,
  FaFileAlt,
  FaCaretDown,
  FaCaretRight,
  FaBriefcase,
  FaFolderOpen,
  FaTimes,
  FaImage,
  FaFileAlt as FaFile,
} from 'react-icons/fa';
import styles from './styles/ContentInfo.module.css';
import { ThemeContext } from '../../context/ThemeContext';
import { useContent } from '../../context/ContentContext';
import ContentSection from './ContentSection';

interface ContentInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContentInfo: React.FC<ContentInfoProps> = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext) as { theme: string };
  const {
    activeSection,
    setActiveSection,
    openCatalogs,
    toggleCatalog,
  } = useContent();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <dialog open={isOpen} className={`${styles.dialog} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>Content Information</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.contentInfo}>
          <div className={styles.container}>
            <nav className={styles.catalog}>
              <ul>
                <li onClick={() => { setActiveSection('Home'); toggleCatalog('Home'); }} className={activeSection === 'Home' ? styles.active : ''}>
                  {openCatalogs.includes('Home') ? <FaCaretDown /> : <FaCaretRight />} <FaHome /> Home
                </li>
                {openCatalogs.includes('Home') && (
                  <ul className={styles.subCatalog}>
                    <li onClick={() => setActiveSection('Pictures')}><FaImage /> Pictures</li>
                    <li onClick={() => setActiveSection('Home Words')}><FaFile /> Home Words</li>
                  </ul>
                )}
                <li onClick={() => { setActiveSection('Projects'); toggleCatalog('Projects'); }} className={activeSection === 'Projects' ? styles.active : ''}>
                  {openCatalogs.includes('Projects') ? <FaCaretDown /> : <FaCaretRight />} <FaProjectDiagram /> Projects
                </li>
                {openCatalogs.includes('Projects') && (
                  <ul className={styles.subCatalog}>
                    <li onClick={() => setActiveSection('Project Words')}><FaFileAlt /> Project Words</li>
                    <li onClick={() => setActiveSection('Projects Experience')}><FaFolderOpen /> Projects Experience</li>
                    <li onClick={() => setActiveSection('Professional Experience')}><FaBriefcase /> Professional Experiences</li>
                  </ul>
                )}
                <li onClick={() => setActiveSection('About')} className={activeSection === 'About' ? styles.active : ''}>
                  <FaUser /> About
                </li>
                <li onClick={() => setActiveSection('More')} className={activeSection === 'More' ? styles.active : ''}>
                  <FaInfoCircle /> More
                </li>
              </ul>
            </nav>
            <div className={styles.content}>
              <ContentSection />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ContentInfo;
