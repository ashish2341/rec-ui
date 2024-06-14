import React from 'react';
import SkeletonLoader from './loader'; 
import styles from "./css/loader.module.css"

const MultipleSkeletonLoaders = ({ count }) => {
  // Generate an array of loading cards based on the count
  const loadingCards = Array.from({ length: count }).map((_, index) => (
    <div key={index} className={`${styles.LoaderStyles}`}>
      <SkeletonLoader />
    </div>
  ));

  return <div>{loadingCards}</div>;
};

export default MultipleSkeletonLoaders;
