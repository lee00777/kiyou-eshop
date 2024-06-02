import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { bannerResponsive } from '../utils/slidersetting';

export default function Banner() {
  return (
    <section>
        <Carousel
          className='w-full z-10 mt-24 min-h-48'
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={bannerResponsive}
          arrows
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="all 0.5s linear"
          transitionDuration={500}
        >
          <img className="w-full" src="/images/banner1.jpeg" alt="banner 1" />
          <img className="w-full" src="/images/banner2.jpeg" alt="banner 2" />
          <img className="w-full" src="/images/banner3.gif" alt="banner 3" />
          <img className="w-full" src="/images/banner4.jpeg" alt="banner 4" />
      </Carousel>
    </section>
  );
}
