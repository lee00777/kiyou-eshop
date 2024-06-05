import React from 'react';
import Products from '../components/Products';
import Banner from '../components/Banner';
import Trends from '../components/Trends';
import {useNavigate} from "react-router-dom"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='mb-12'>
      <Banner />
      <Trends />
      <p className='mb-2 font-semibold text-description text-2xl text-center'>WEEKLY BEST</p>
      <Products category=""/>
      <button className='bg-brand text-white rounded-sm p-3 grid cursor-pointer mx-auto' onClick={()=>{navigate(`/best`)}}>FIND MORE</button>
    </div>
  );
}

