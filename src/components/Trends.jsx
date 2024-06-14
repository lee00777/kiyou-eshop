import React from 'react';
import TrendCard from './TrendCard';
import Slider from './UI/Slider';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../utils/slidersetting';
import { trends } from '../api/trends';

export default function Trends() {
  return (
    <div className='w-full my-40 text-description'>
      <section className='text-center w-4/6 mx-auto my-40'>
        <h2 className='text-2xl'><span className='font-bold'>KIYOU</span> is..</h2>
        <p className='mt-5'>
          <b>KIYOU</b> is a special space for women in their 20s and 30s. <br />
          We offer a variety of clothing styles that allow all women to express themselves. <br />
          From casual to elegant formal styles, we guarantee high quality at a reasonable price. <br />
        </p>
      </section>
      <section className='mt-20 py-20 w-full z-0 bg-trend'>
        <Slider cssStyle={'w-5/6 flex mx-auto z-10'} responsiveStyle={responsive} displayDots={false}>
          {trends.map((item)=>{
              return <TrendCard key={item.id} image={item.image} trends={item.trends} description={item.description}/>
            })}
        </Slider>
      </section>
    </div>
  );
}

