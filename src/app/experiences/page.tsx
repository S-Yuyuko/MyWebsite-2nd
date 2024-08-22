'use client';

import React, { useEffect } from 'react';
import withAuth from '../components/withAuth';
import ProjectWords from '../components/experiences/ProjectWords';
import Projects from '../components/experiences/Projects';
import ProfessionalExperiences from '../components/experiences/ProfessionalExperiences';
import styles from './Experiences.module.css'; // Use CSS Modules

const Experiences = () => {
  
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.experienceSection}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className={styles.experiencesContainer}>
      <div className={`${styles.experienceSection} ${styles.projectWordsSection}`}>
        <ProjectWords />
      </div>
      <div className={`${styles.experienceSection} ${styles.projectsSection}`}>
        <Projects />
      </div>
      <div className={`${styles.experienceSection} ${styles.professionalExperiencesSection}`}>
        <ProfessionalExperiences />
      </div>
    </div>
  );
};

export default withAuth(Experiences);
