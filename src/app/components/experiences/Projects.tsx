'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/Projects.module.css';
import { useProjects } from '../../context/ProjectsContext';
import { FaTimes } from 'react-icons/fa';
import Loading from '../Loading'; // Adjust the path as necessary

const Projects: React.FC = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
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

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, [projects]);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const handleImageClick = (image: string) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  if (projects.length === 0) {
    return <Loading />;
  }

  return (
    <div
      ref={projectRef}
      className={`${styles.projectContainer} ${isVisible ? styles.projectVisible : ''}`}
    >
      <div className={styles.projectCatalog}>
        <ul className={styles.projectCatalogList}>
          {projects.map((project) => (
            <li
              key={project.id}
              className={`${styles.projectCatalogItem} ${selectedProject?.id === project.id ? styles.projectActive : ''}`}
              onClick={() => handleProjectClick(project)}
            >
              {project.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.projectDetails}>
        {selectedProject && (
          <>
            <h2 className={styles.projectTitle}>{selectedProject.title}</h2>
            <p className={styles.projectSkills}><strong>Skills:</strong> {selectedProject.skills}</p>
            <p className={styles.projectDescription}>{selectedProject.description}</p>
            <div className={styles.projectMediaContainer}>
              {Array.isArray(selectedProject.mediaFiles) ? (
                selectedProject.mediaFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Project media ${index + 1}`}
                    className={styles.projectMediaImage}
                    onClick={() => handleImageClick(file)}
                  />
                ))
              ) : (
                <p>No media available for this project.</p>
              )}
            </div>
          </>
        )}
      </div>

      {fullscreenImage && (
        <div className={styles.projectFullscreenOverlay} onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen media" className={styles.projectFullscreenImage} />
          <FaTimes className={styles.projectCloseIcon} onClick={closeFullscreen} />
        </div>
      )}
    </div>
  );
};

export default Projects;
