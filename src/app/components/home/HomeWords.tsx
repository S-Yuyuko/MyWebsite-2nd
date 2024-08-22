import React from 'react';
import { useContent } from '../../context/ContentContext'; // Adjust the path as necessary
import styles from './styles/HomeWords.module.css'; // Import the CSS module

const HomeWords: React.FC = () => {
  const { selectedHomeWords } = useContent();

  return (
    <div className={styles.homeWordsContainer}>
      {selectedHomeWords ? (
        <>
          <h2 className={styles.titleWithShadow}>{selectedHomeWords.title}</h2>
          <p className={styles.description}>{selectedHomeWords.description}</p>
        </>
      ) : (
        <p className={styles.noSelection}>No home word selected.</p>
      )}
    </div>
  );
};

export default HomeWords;
