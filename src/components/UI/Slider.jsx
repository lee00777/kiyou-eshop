import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Slider({cssStyle, children, responsiveStyle, displayDots}) {

  return (
    <Carousel
      className={cssStyle}
      swipeable={true}
      draggable={false}
      showDots={displayDots}
      responsive={responsiveStyle}
      arrows
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      customTransition="all 0.5s linear"
      transitionDuration={500}>
      {children}
    </Carousel>
  );
}

