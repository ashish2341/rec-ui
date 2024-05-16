// components/SkeletonLoader.js
import React from 'react';
import styles from './css/single.module.css';

const SingleLineLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.line}></div>
    </div>
  );
};

export default SingleLineLoader;
