import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const MultiCarousel = ({ UI }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  return (
    <div style={{ width: "95%" }}>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        draggable
        swipeable
        containerClass="carousel-container"
      >
        {UI()}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
