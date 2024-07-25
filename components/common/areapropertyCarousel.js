"use client";

import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./css/carousel.module.css"
import { CustomButtonLeftAsArrows, CustomButtonRightAsArrows } from "./customarrow";


export default function AreaMultiCarousel({ UI }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  const carouselRef = useRef(null);

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const previousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <>
    <div className={`mr-2 ${styles.customCarouselCenter}`}>
      <CustomButtonLeftAsArrows next={nextSlide} />
    </div>
    <div style={{ width: "90%" }}>
      <Carousel
        arrows={false} 
        ref={carouselRef}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        draggable
        swipeable
        containerClass="carousel-container"
        renderDotsOutside={true}
      >
        {UI()}
      </Carousel>
    </div>
    <div className={`ml-2 ${styles.customCarouselCenter}`}>
      <CustomButtonRightAsArrows previous={previousSlide} />
    </div>
    </>
  );
};
