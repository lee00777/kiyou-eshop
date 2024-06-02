import React from 'react';
import Products from '../components/Products';
import Banner from '../components/Banner';
import Trends from '../components/Trends';

export default function Home() {
  return (
    <>
      <Banner />
      <Trends />
      <p className='-mt-12 mb-12 font-semibold text-description text-2xl text-center'>WEEKLY BEST</p>
      <Products category=""/>
    </>
  );
}

