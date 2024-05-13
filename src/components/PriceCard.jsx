import React from 'react';

export default function PriceCard({text, price}) {
  return (
    <div className='bg-gray-50 p-8 mx-2 my-4 md:my-0 rounded-2xl text-center text-lg md:text-xl'> 
      <p className="font-bold">{text}</p>
      <p className='mt-3 font-semibold text-brand text-xl md:text-2xl'>${price}</p>
    </div>
  );
}

