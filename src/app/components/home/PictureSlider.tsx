'use client';

import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext'; // Adjust the import path as needed
import styles from './styles/PictureSlider.module.css';

const PictureSlider = () => {
  const { images } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={styles.slider}>
      {images.length > 0 &&
        images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          >
            <img
              src={`${baseURL}${image.path}`} // Construct the full URL here
              alt={`Slide ${index}`}
              className={styles.image}
            />
          </div>
        ))}
    </div>
  );
};

export default PictureSlider;
