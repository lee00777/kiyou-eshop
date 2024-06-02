import { React, memo } from 'react';
import { Link } from 'react-router-dom';

export default memo(function TrendCard({image, trends, description}) {
    return (
      <Link to={`${trends}`} className='flex flex-col px-3 cursor-pointer'>
        <img src={image} alt="trend card" className=''/>
        <p className='text-center tracking-widest pt-10 font-semibold text-md text-black'>{description}</p>
      </Link>
    );
  }
)

