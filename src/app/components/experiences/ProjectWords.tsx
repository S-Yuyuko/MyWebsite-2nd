'use client';

import React from 'react';
import styles from './styles/ProjectWords.module.css';
import { useProjects } from '../../context/ProjectsContext';

const ProjectWords: React.FC = () => {
  const { selectedProjectWords } = useProjects();

  return (
    <div className={styles.projectWordsContainer}>
      {selectedProjectWords ? (
        <>
          <h2 className={styles.projectWordsTitle}>{selectedProjectWords.title}</h2>
          <p className={styles.projectWordsDescription}>{selectedProjectWords.description}</p>
        </>
      ) : (
        <p className={styles.projectWordsNoSelection}>No Project Words selected.</p>
      )}
    </div>
  );
};

export default ProjectWords;
