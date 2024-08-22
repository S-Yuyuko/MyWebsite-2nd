'use client';

import React, { useEffect, useRef } from 'react';
import { useOther } from '../../context/OtherContext';
import { FaUser, FaTools, FaGraduationCap } from 'react-icons/fa';
import styles from './styles/About.module.css';

const About: React.FC = () => {
  const { selectedAboutItem } = useOther();
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const introductionRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);

  const handleSectionClick = (section: string) => {
    setActiveSection(prevSection => prevSection === section ? null : section);
  };

  useEffect(() => {
    const sections = [introductionRef.current, skillsRef.current, educationRef.current];
    sections.forEach((section) => {
      if (section) {
        setTimeout(() => {
          section.classList.add(styles.visible);
        }, 100); // Delay to allow for smoother initial transition
      }
    });
  }, []);

  if (!selectedAboutItem) {
    return <p className={styles.noSelection}>No About Item selected.</p>;
  }

  return (
    <div className={styles.aboutContainer}>
      {/* Introduction Section */}
      <div ref={introductionRef} className={`${styles.sectionBackground} ${styles.introduction}`}>
        <div
          className={`${styles.section} ${activeSection === 'introduction' ? styles.active : ''}`}
          onClick={() => handleSectionClick('introduction')}
        >
          <div className={styles.sectionTitle}>
            <FaUser /> {/* Icon */}
            <strong>Introduction</strong>
          </div>
          <div className={styles.sectionContent}>
            {selectedAboutItem.introduction}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div ref={skillsRef} className={`${styles.sectionBackground} ${styles.skills}`}>
        <div
          className={`${styles.section} ${activeSection === 'skills' ? styles.active : ''}`}
          onClick={() => handleSectionClick('skills')}
        >
          <div className={styles.sectionTitle}>
            <FaTools /> {/* Icon */}
            <strong>Skills</strong>
          </div>
          <div className={styles.sectionContent}>
            {selectedAboutItem.skills}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div ref={educationRef} className={`${styles.sectionBackground} ${styles.education}`}>
        <div
          className={`${styles.section} ${activeSection === 'education' ? styles.active : ''}`}
          onClick={() => handleSectionClick('education')}
        >
          <div className={styles.sectionTitle}>
            <FaGraduationCap /> {/* Icon */}
            <strong>Education</strong>
          </div>
          <div className={styles.sectionContent}>
            {selectedAboutItem.education}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
