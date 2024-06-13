import React from 'react';
import { responsive } from '../../utils/slidersetting';

export default function Carousel({a, child}) {
  return (
    <div>
        <Carousel 
              className={a}
              swipeable={true}
              centerMode
              draggable={false}
              responsive={responsive}
              arrows
              customTransition="all 0.5s linear"
              transitionDuration={500}
              rewind={false}
              rewindWithAnimation={false}
              shouldResetAutoplay
              >
              {child}
          </Carousel>
    </div>
  );
}

