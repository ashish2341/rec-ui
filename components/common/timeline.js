// components/Timeline.js
import React, { useState } from 'react';
import styles from './css/timeline.module.css';

const Timeline = ({ milestones }) => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [yearNext, setYearNext] = useState(1);
  const [prevNext, setPrevNext] = useState(1);

  const goToPreviousYear = () => {
    setCurrentYearIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setPrevNext(currentYearIndex);
  };

  const goToNextYear = () => {
    setCurrentYearIndex((prevIndex) =>
      Math.min(prevIndex + 1, milestones.length - 1)
    );
    setYearNext((prevIndex) =>
      Math.min(prevIndex + 1, milestones.length - 1)
    );
  };

  const currentMilestone = milestones[currentYearIndex];
  const nextYear = milestones[yearNext];
  return (
    <>
    <h1 className={styles.timelineHeading}>Our Journey so far</h1>
    <div className={styles.timelineMain}>
      <div className={styles.timelineData}>
            {currentMilestone && (
            <div className={styles.timelineItemDetails}>
                <div className={`${styles.timelineContent} mt-10 mb-10`}>
                    <h3 className="text-2xl font-semibold">{currentMilestone.title}</h3>
                    <p className='text-base'>{currentMilestone.description}</p>
                </div>
            </div>
            )}
        </div>
        <div className={styles.timelineImage}>
          <div className={`${styles.aboutWelcomeImg} ml-10 mt-10 mb-10`}>
            <img 
                src="../../../img/contactusImg1.jpg"
            />
          </div>
        </div>
    </div>
    <div className={`${styles.timelineButtons}`}>
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={goToPreviousYear} disabled={currentYearIndex === 0}
        >
        Previous
        </button>
        <div className={`${styles.timeline} mt-2`}>
            {currentMilestone && (
            <div className={styles.timelineItem}>
                <div className={styles.timelineDate}>
                {currentMilestone.date}
                </div>
            </div>
            )}
        </div>
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={goToNextYear}
            disabled={currentYearIndex === milestones.length - 1}
        >
        Next
        </button>
    </div>
    </>
  );
};

export default Timeline;
