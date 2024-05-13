import React from 'react';

export default function TrendCard({image, description}) {
  return (
    <div className='flex flex-col px-3 cursor-pointer'>
      <img src={image} alt="trend card" className=''/>
      <p className='text-center tracking-widest pt-10 font-semibold text-md text-black'>{description}</p>
    </div>
  );
}

