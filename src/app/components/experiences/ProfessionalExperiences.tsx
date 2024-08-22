'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/ProfessionalExperiences.module.css';
import { useProjects } from '../../context/ProjectsContext';
import { FaTimes } from 'react-icons/fa';
import Loading from '../Loading'; // Adjust the path as necessary

const ProfessionalExperiences: React.FC = () => {
  const { professionalExperiences } = useProjects();
  const [selectedExperience, setSelectedExperience] = useState(professionalExperiences[0]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (professionalExperiences.length > 0) {
      setSelectedExperience(professionalExperiences[0]);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => {
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, [professionalExperiences]);

  const handleExperienceClick = (experience: typeof professionalExperiences[0]) => {
    setSelectedExperience(experience);
  };

  const handleImageClick = (image: string) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  if (professionalExperiences.length === 0) {
    return <Loading />;
  }

  return (
    <div
      ref={experienceRef}
      className={`${styles.professionalExperiencesContainer} ${isVisible ? styles.professionalVisible : ''}`}
    >
      <div className={styles.professionalCatalog}>
        <ul className={styles.professionalCatalogList}>
          {professionalExperiences.map((experience) => (
            <li
              key={experience.id}
              className={`${styles.professionalCatalogItem} ${selectedExperience?.id === experience.id ? styles.professionalActive : ''}`}
              onClick={() => handleExperienceClick(experience)}
            >
              {experience.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.professionalExperienceDetails}>
        {selectedExperience && (
          <>
            <h2 className={styles.professionalExperienceTitle}>{selectedExperience.title}</h2>
            <p className={styles.professionalExperienceCompany}><strong>Company:</strong> {selectedExperience.company}</p>
            <p className={styles.professionalExperienceDescription}>{selectedExperience.description}</p>
            <div className={styles.professionalMediaContainer}>
              {Array.isArray(selectedExperience.mediaFiles) ? (
                selectedExperience.mediaFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Experience media ${index + 1}`}
                    className={styles.professionalMediaImage}
                    onClick={() => handleImageClick(file)}
                  />
                ))
              ) : (
                <p>No media available for this experience.</p>
              )}
            </div>
          </>
        )}
      </div>

      {fullscreenImage && (
        <div className={styles.professionalFullscreenOverlay} onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen media" className={styles.professionalFullscreenImage} />
          <FaTimes className={styles.professionalCloseIcon} onClick={closeFullscreen} />
        </div>
      )}
    </div>
  );
};

export default ProfessionalExperiences;
