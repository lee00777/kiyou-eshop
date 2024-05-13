import React from 'react';
import Products from '../components/Products';
import Banner from '../components/Banner';
import Trends from '../components/Trends';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Banner />
      <Trends />
      <p className='-mt-12 mb-12 font-semibold text-description text-2xl text-center'>WEEKLY BEST</p>
      <Products category=""/>
      <button className='w-auto bg-brand mb-12 text-xl flex justify-center align-center mx-auto p-3 text-white'>LOAD MORE</button>
    </>
  );
}

