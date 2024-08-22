'use client';

import React, { useEffect, useRef } from 'react';
import withAuth from '../components/withAuth';
import PictureSlider from '../components/home/PictureSlider';
import HomeWords from '../components/home/HomeWords';
import Footer from '../components/home/Footer';
import styles from './Home.module.css';

const Home = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        } else {
          entry.target.classList.remove(styles.visible);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (sliderRef.current) observer.observe(sliderRef.current);
    if (wordsRef.current) observer.observe(wordsRef.current);

    return () => {
      if (sliderRef.current) observer.unobserve(sliderRef.current);
      if (wordsRef.current) observer.unobserve(wordsRef.current);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div ref={sliderRef} className={styles.section}>
        <PictureSlider />
      </div>
      <div ref={wordsRef} className={styles.section}>
        <HomeWords />
      </div>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};

export default withAuth(Home);
