import React from 'react';
import Slider from './UI/Slider';
import 'react-multi-carousel/lib/styles.css';
import { bannerResponsive } from '../utils/slidersetting';

export default function Banner() {
  return (
    <section>
      <Slider cssStyle={'w-full z-10 mt-24 min-h-48'} responsiveStyle={bannerResponsive} displayDots={true}>
        <img className="w-full" src="/images/banner1.jpeg" alt="banner 1" />
        <img className="w-full" src="/images/banner2.jpeg" alt="banner 2" />
        <img className="w-full" src="/images/banner3.gif" alt="banner 3" />
        <img className="w-full" src="/images/banner4.jpeg" alt="banner 4" />
      </Slider>
    </section>
  );
}
