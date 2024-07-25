import * as React from "react";
import styles from "./css/carousel.module.css"

const CustomLeftArrow = ({ onClick }) => (
  <i onClick={() => onClick()} className={`${styles.custom-left-arrow}`} />
);
const CustomRightArrow = ({ onClick }) => {
  return <i className={`${styles.custom-right-arrow}`} onClick={() => onClick()} />;
};

const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
  const { totalItems, currentSlide } = carouselState;
  return (
    <div className="custom-button-group">
      <div>Current slide is {currentSlide}</div>
      <button onClick={() => previous()}>Previous slide</button>
      <button onClick={() => next()}>Next slide</button>
      <button
        onClick={() => goToSlide(Math.floor(Math.random() * totalItems + 1))}
      >
        Go to a random slide
      </button>
    </div>
  );
};
const CustomButtonRightAsArrows = ({ previous }) => {
  return (
    <div className={`${styles.customButtons}`}>
      <button className={`${styles.customLeftbutton}`} onClick={previous}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </div>
  );
};

const CustomButtonLeftAsArrows = ({ next }) => {
    return (
      <div className={`${styles.customButtons}`}>
        <button className={`${styles.customLeftbutton}`} onClick={next}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>
      </div>
    );
  };

export {
  CustomLeftArrow,
  CustomRightArrow,
  CustomButtonGroup,
  CustomButtonRightAsArrows,
  CustomButtonLeftAsArrows
};